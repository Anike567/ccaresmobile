import axios from 'axios';
import React, {useState, useContext} from 'react';
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

import { Formik } from 'formik';
import { View, KeyboardAvoidingView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; // For hide password
import { AntDesign } from '@expo/vector-icons'; // For show password
import { encode } from 'base-64';
import YearsContextProvider from '../store/context/serviceYears';
import { YearsOfServiceContext }  from '../store/context/serviceYears';


const {brand, darkLight} = Colors;

const Login = ({navigation}) => {

    const yearsContext = useContext(YearsOfServiceContext);
    const [hidePassword, setHidePassword] = useState(true);

    const [responseMessageAfterSendingCreds, setResponseMessageAfterSendingCreds] = useState('')

    function forgotpasswordhandler()
    {
        navigation.navigate('ForgotPassword');
    }

 
    return (
        <StyledContainer>    
            <InnerContainer>
                {/* <PageLogo resizeMode='cover' source={require('../assets/cdac.jpg')}/> */}
                {/* <PageTitle>C-CARES</PageTitle> */}
                {/* <Subtitle>Member Login</Subtitle> */}

                <Formik
                    initialValues={{accountno: '',password: ''}}
                    onSubmit={(values) => {
                        formJSON = {
                            "loginId": values.accountno,
                            "password": encode(values.password),
                            "role": "Member or Employee"
                        }
                        // console.log(formJSON);

                        axios.post(`http://10.180.146.24:5086/member/login/find`, formJSON)
                        .then(data => {
                            const formData = new FormData();
                            formData.append('loginId',formJSON.loginId)
                            console.log(formJSON.loginId);
                            axios.post(
                                'http://10.180.146.24:5086/member/send/login/otp',
                                    formData, {headers: {'Content-Type': 'multipart/form-data',},}
                            )
                            .then(data => {
                                yearsContext.setLoginId(formJSON.loginId);
                                navigation.navigate('Otp',{
                                    accountNo: formJSON.loginId,
                                    pwd: encode(values.password)
                                })
                            })
                            .catch(e => {
                                setResponseMessageAfterSendingCreds('OTP Not sent')
                                console.log(e);
                            })
                            
                        })
                        .catch(e => {
                            setResponseMessageAfterSendingCreds('Invalid Credentials')
                            console.log(e);
                        })
                    }}
                >
                    {({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>
                        < MyTextInput 
                            label="Account Number"
                            icon="account"
                            placeholder="Eg. CDAC/1/2345"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('accountno')}
                            value = {values.accountno}
                        />

                        < MyTextInput 
                            label="Password"
                            icon="lock"
                            onChangeText={handleChange('password')}
                            value = {values.password}
                            secureTextEntry = {hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                        />
                        <MsgBox message>{responseMessageAfterSendingCreds}</MsgBox>
                        {/* onPress={loginbuttonhandler} */}
                        <StyledButton onPress={handleSubmit}>
                            <ButtonText>LOGIN</ButtonText>
                        </StyledButton>
                        <Line />
                        <StyledButton onPress={forgotpasswordhandler}>
                            <ButtonText>Forgot Password ?</ButtonText>
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

export default Login;