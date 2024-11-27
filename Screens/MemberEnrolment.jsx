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
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; // For hide password
import { AntDesign } from '@expo/vector-icons'; // For show password
import { encode } from 'base-64';

const {brand, darkLight} = Colors;

const Memberenrolment = ({navigation}) => {
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
                {/* <PageLogo resizeMode='cover' source={require('../assets/cdac.jpg')}/> */}
                {/* <PageTitle>C-CARES</PageTitle> */}
                {/* <Subtitle>Member Enrolment</Subtitle> */}

                <Formik
                    initialValues={{accountno: '',newpassword: '',confirmpassword: ''}}
                    onSubmit={(values) => {
                        console.log(values.newpassword,values.confirmpassword);
                        if(values.newpassword !== values.confirmpassword)
                        {
                            setPasswordMatchMessage('Passwords do not match')
                            return;
                        }
                        setPasswordMatchMessage('')
                        formJSON = {
                            "loginId": accountNo,
                            "password": values.newpassword,
                            "role": "Member or Employee"
                        }
                        const formData = new FormData();
                        formData.append('cmpfoAccNO',formJSON.loginId)
                        console.log(formData);
                        axios.post(
                                'http://10.180.146.24:5086/member/send/otp',
                                formData, {headers: {'Content-Type': 'multipart/form-data',},}
                        )
                        .then(data => {
                            // console.log(data.data);
                            navigation.navigate('EnrolmentOtp',{
                                accountNo: formJSON.loginId,
                                pwd: encode(formJSON.password)
                            })
                        })
                        .catch(e => {
                            setPasswordMatchMessage('OTP Not sent')
                            console.log(e);
                        })



                        navigation.navigate('EnrolmentOtp')
                        


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
                                const formdata = qs.stringify({
                                    cmpfoAccNO: text
                                });

                                axios.post(
                                    'http://10.180.146.24:5086/member/find',
                                    formdata,
                                    {headers: {'Content-Type': 'application/x-www-form-urlencoded',},}
                                 )
                                 .then(data => {
                                    console.log('%%%%%%%%%%%%%%%%%')
                                    console.log(data.status)
                                    setMemberFoundStatus(true);
                                    setEnrolmentMessage('')
                                    console.log('%%%%%%%%%%%%%%%%%')
                                 })
                                 .catch(err => {
                                    console.log('%%%%%%%%%%%%%%%%%')
                                    console.log(typeof err.response.data.http_status_code)
                                    if(err.response.data.http_status_code === 409)
                                    {
                                        setEnrolmentMessage('Member Already Enrolled')
                                        setMemberFoundStatus(false)
                                    }
                                    if(err.response.data.http_status_code === 404)
                                    {
                                        setEnrolmentMessage('')
                                        setMemberFoundStatus(false)
                                    }
                                    
                                    console.log('%%%%%%%%%%%%%%%%%')
                                 })
                              
                            }}
                            value = {accountNo}
                        />
                        <MsgBox message>{enrolmentmessage}</MsgBox>
                        { memberFoundStatus &&
                         < MyTextInput 
                            label="New Password"
                            icon="lock"
                            onChangeText={handleChange('newpassword')}
                            value = {values.newpassword}
                            secureTextEntry = {hideNewPassword}
                            isPassword={true}
                            hidePassword={hideNewPassword}
                            setHidePassword={setHideNewPassword}
                        />
                        }
                        { memberFoundStatus &&
                        < MyTextInput 
                            label="Confirm Password"
                            icon="lock"
                            onChangeText={handleChange('confirmpassword')}
                            value = {values.confirmpassword}
                            secureTextEntry = {hideConfirmPassword}
                            isPassword={true}
                            hidePassword={hideConfirmPassword}
                            setHidePassword={setHideConfirmPassword}
                        />
                        }
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

export default Memberenrolment;