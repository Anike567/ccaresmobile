import axios from 'axios';
import React, {useState} from 'react';
import qs from "qs";
import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    Subtitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    Colors,
    StyledButton,
    ButtonText,
    MsgBox,
    Line
} from '../components/styles';

import { ErrorMessage, Formik } from 'formik';
import { generateRandomString } from "../Utility/UtilityMethods";
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; // For hide password
import { AntDesign } from '@expo/vector-icons'; // For show password
import { encode } from 'base-64';
// const  bcrypt = require('bcryptjs');
// import BcryptReactNative from 'bcrypt-react-native'
import CryptoJS from 'react-native-crypto-js';



const {brand, darkLight} = Colors;

const ForgotPassword = ({navigation}) => {
    // const [hidePassword, setHidePassword] = useState(true);
    const [accountNo, setAccountNo] = useState('');

    const [hideNewPassword, setHideNewPassword] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

    const [newPasswordVal, setnewPasswordVal] = useState('');
    const [confirmPasswordVal, setConfirmPasswordVal] = useState('');
    
    const [memberFoundStatus, setMemberFoundStatus] = useState(false);

    const [enrolmentmessage, setEnrolmentMessage] = useState('')
    const [passwordMatchMessage, setPasswordMatchMessage] = useState('')

    const [responseMessageAfterSendingCreds, setResponseMessageAfterSendingCreds] = useState('')


    return (
        <StyledContainer>
            <InnerContainer>
                
                <Formik
                    initialValues={{accountno: ''}}
                    onSubmit={(values) => {
                        
                        const password = generateRandomString(11);
                        const hash = (password) => {
                            return CryptoJS.AES.encrypt(password, password).toString();
                        };

                        const hashedUser = hash(password);
                        console.log(hashedUser)
                        


                        const formdata = qs.stringify({
                            cmpfAccNO: accountNo,
                            user: hashedUser
                        });

                        console.log(formdata);

                        axios.post(
                            'http://10.180.146.24:5086/member/forgot/password/find/member',
                            formdata,
                            {headers: 
                                {
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                    'hash': encode(password),
                                },
                            }
                        )
                        .then(memberFound => {
                            console.log(memberFound);
                            const requestStatus = memberFound.data['http-status']
                            console.log(`request status is ${requestStatus}`)

                        })
                        .catch(e => {
                            console.log('Error finding member in forgot password');
                            console.log(e);
                        })



                        
                        // formJSON = {
                        //     "loginId": accountNo,
                        //     "password": values.newpassword,
                        //     "role": "Member or Employee"
                        // }
                        // const formData = new FormData();
                        // formData.append('cmpfoAccNO',formJSON.loginId)
                        // console.log(formData);
                        // axios.post(
                        //         'http://10.180.146.24:5086/member/send/otp',
                        //         formData, {headers: {'Content-Type': 'multipart/form-data',},}
                        // )
                        // .then(data => {
                        //     // console.log(data.data);
                        //     navigation.navigate('EnrolmentOtp',{
                        //         accountNo: formJSON.loginId,
                        //         pwd: encode(formJSON.password)
                        //     })
                        // })
                        // .catch(e => {
                        //     setPasswordMatchMessage('OTP Not sent')
                        //     console.log(e);
                        // })



                        // navigation.navigate('EnrolmentOtp')
                        


                    }}
                >
                    {({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>
                        < MyTextInput 
                            label="Account Number"
                            icon="account"
                            placeholder="Eg. CDAC/1/2345"
                            placeholderTextColor={darkLight}
                            onChangeText={text => {
                                setAccountNo(text)
                            //     const formdata = qs.stringify({
                            //         cmpfoAccNO: text
                            //     });

                            //     axios.post(
                            //         'http://10.180.146.24:5086/member/forgot/password/find/member',
                            //         formdata,
                            //         {headers: {'Content-Type': 'application/x-www-form-urlencoded',},}
                            //      )
                            //      .then(data => {
                            //         console.log('%%%%%%%%%%%%%%%%%')
                            //         console.log(data.status)
                            //         setMemberFoundStatus(true);
                            //         setEnrolmentMessage('')
                            //         console.log('%%%%%%%%%%%%%%%%%')
                            //      })
                            //      .catch(err => {
                            //         console.log('%%%%%%%%%%%%%%%%%')
                            //         console.log(typeof err.response.data.http_status_code)
                            //         if(err.response.data.http_status_code === 409)
                            //         {
                            //             setEnrolmentMessage('Member Already Enrolled')
                            //             setMemberFoundStatus(false)
                            //         }
                            //         if(err.response.data.http_status_code === 404)
                            //         {
                            //             setEnrolmentMessage('')
                            //             setMemberFoundStatus(false)
                            //         }
                                    
                            //         console.log('%%%%%%%%%%%%%%%%%')
                            //      })
                              
                            }}
                            value = {accountNo}
                        />
                        <MsgBox message>{enrolmentmessage}</MsgBox>
                        <MsgBox>{passwordMatchMessage}</MsgBox>

                        <StyledButton onPress={handleSubmit}>
                            <ButtonText>Send OTP</ButtonText>
                        </StyledButton>
                    </StyledFormArea>)}
                </Formik>
            </InnerContainer>
        </StyledContainer>
    );
};

const MyTextInput = ({label, icon, isPassword,hidePassword,setHidePassword, ...props}) => {
    return (
        <View>
            <LeftIcon>
                <MaterialCommunityIcons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    {hidePassword ? 
                    <AntDesign name="eye" size={30} color="black" /> : <Entypo name="eye-with-line" size={30} color="black" />
                    }            
                </RightIcon>
            )}
        </View>
    )
}

export default ForgotPassword;