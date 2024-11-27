import styled from "styled-components/native"
import axios from 'axios';
import React, {useState, useRef, useContext} from 'react';
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
import { View, Text, Pressable, Keyboard, TextInput, StyleSheet} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; // For hide password
import { AntDesign } from '@expo/vector-icons'; // For show password
import { Directions } from "react-native-gesture-handler";
import OTPInputView from '@twotalltotems/react-native-otp-input'
import OTPInput from "../components/OTPInput";
import YearsContextProvider from '../store/context/serviceYears';
import { YearsOfServiceContext }  from '../store/context/serviceYears';


const {brand, darkLight} = Colors;

const Otpscreen = ({navigation, route}) => {
    const yearsContext = useContext(YearsOfServiceContext);
    const [otpErrorMessage, setOtpErrorMessage] = useState('')

    const [Statep1, setStatep1] = useState('')
    const [Statep2, setStatep2] = useState('')
    const [Statep3, setStatep3] = useState('')
    const [Statep4, setStatep4] = useState('')
    const [Statep5, setStatep5] = useState('')
    const [Statep6, setStatep6] = useState('')

    const pin1ref = useRef(null);
    const pin2ref = useRef(null);
    const pin3ref = useRef(null);
    const pin4ref = useRef(null);
    const pin5ref = useRef(null);
    const pin6ref = useRef(null);

    const focusNextInput = (nextInputRef) => {
        nextInputRef.current.focus();
      };

    async function loginbuttonhandler()
    {
        const otpToSend = Statep1+Statep2+Statep3+Statep4+Statep5+Statep6;
        if(otpToSend.length !== 6){
            setOtpErrorMessage('Invalid OTP');
        }
        const formData = new FormData();
        formData.append('loginId',yearsContext.loginId)
        formData.append('otp',otpToSend)
        axios.post(
            'http://10.180.146.24:5086/member/verify/login/otp',
                formData, {headers: {'Content-Type': 'multipart/form-data',},}
        )
        .then(data => {
            const d = data.data
            console.log(d);
            if (d["http-status"] === "OK"){
                formJSON = {
                    "loginId": route.params.accountNo,
                    "password": route.params.pwd,
                    "role": "Member or Employee"
                }
                axios.post(`http://10.180.146.24:5086/member/login`, formJSON)
                .then(data => {
                    const tkn = data.data.data.token
                    yearsContext.setAuthToken(tkn)
                    const formDataForPF = new URLSearchParams(); //new FormData();
                    console.log('-------')
                    console.log(yearsContext.loginId);

                    console.log(yearsContext.authToken);
                    console.log('-------')
                    formDataForPF.append('cmpfAccNo',yearsContext.loginId)
                    formDataForPF.append('fromYear','1950')
                    formDataForPF.append('toYear',(parseInt(new Date().getFullYear())+1).toString())
                    axios.post(
                        'http://10.180.146.24:5086/getledgerpfyearbetweenyearrange',
                        formDataForPF, {
                            headers: {
                                Authorization: `Bearer ${tkn}`,
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                        }
                    )
                    .then(data => {
                        yearsContext.getYears(data.data.data)
                        console.log(typeof data.data.data)
                        navigation.navigate('DrawerNavigator')
                    })
                    .catch(e => {
                        setOtpErrorMessage('Error fetching PF details')
                        console.log(e);
                    })
                    
                })
                .catch(e => {
                    setOtpErrorMessage('Problem with authtoken or navigation');
                })
            }
            else{
                setOtpErrorMessage('Invalid OTP');
            }
        })
        .catch(e => {
            setOtpErrorMessage('OTP Not sent')
            console.log(e);
        })

    }
  

    return (
        <StyledContainer style={{textAlign:'center'}}>
            <Subtitle>Enter 6-digit code received on your mobile</Subtitle>
            <View style={{fleX:0.6, justifyContent: "space-between", flexDirection:"row", textAlign:'center'}}>
                <TextInput 
                    ref={pin1ref}
                    onChangeText={p1 => {
                        setStatep1(p1);
                        if (p1.length === 1) {
                            focusNextInput(pin2ref);
                        }
                        
                    }}
                    style={styles.otpdigit} 
                    value={Statep1}
                    maxLength={1}               
                    keyboardType="numeric"
                />
                <TextInput 
                    ref={pin2ref}
                    onChangeText={p2 => {
                        setStatep2(p2);
                        if (p2.length === 1) {
                            focusNextInput(pin3ref);
                        }
                        else if(p2.length === 0){
                            focusNextInput(pin1ref);
                        }
                    }}
                    style={styles.otpdigit}
                    value={Statep2}
                    maxLength={1}  
                    keyboardType="numeric"              
                />
                <TextInput 
                    ref={pin3ref}
                    onChangeText={p3 => {
                        setStatep3(p3);
                        if (p3.length === 1) {
                            focusNextInput(pin4ref);
                        }
                        else if(p3.length === 0){
                            focusNextInput(pin2ref);
                        }
                    }}
                    style={styles.otpdigit} 
                    value={Statep3}
                    maxLength={1} 
                    keyboardType="numeric"              
                />
                <TextInput 
                    ref={pin4ref}
                    onChangeText={p4 => {
                        setStatep4(p4);
                        if (p4.length === 1) {
                            focusNextInput(pin5ref);
                        }
                        else if(p4.length === 0){
                            focusNextInput(pin3ref);
                        }
                    }}
                    style={styles.otpdigit}  
                    value={Statep4}
                    maxLength={1}
                    keyboardType="numeric"              
                />
                <TextInput 
                    ref={pin5ref}
                    onChangeText={p5 => {
                        setStatep5(p5);
                        if (p5.length === 1) {
                            focusNextInput(pin6ref);
                        }
                        else if(p5.length === 0){
                            focusNextInput(pin4ref);
                        }
                    }}
                    style={styles.otpdigit} 
                    value={Statep5}
                    maxLength={1} 
                    keyboardType="numeric"              
                />
                <TextInput 
                    ref={pin6ref}
                    onChangeText={p6 => {
                        setStatep6(p6);
                        if(p6.length === 0){
                            focusNextInput(pin5ref);
                        }
                    }}
                    style={styles.otpdigit} 
                    value={Statep6}
                    maxLength={1}
                    keyboardType="numeric"               
                />
            </View>
            <Text>{'\n'}</Text>
            <MsgBox message>{otpErrorMessage}</MsgBox>
            <StyledButton onPress={loginbuttonhandler}>
                            <ButtonText>Confirm OTP</ButtonText>
                        </StyledButton>
        </StyledContainer>
    );
};

const styles = StyleSheet.create({
    otpdigit: {
        backgroundColor: "#f5f4f2",
        fontWeight: "100",
        alignSelf:"center",
        // paddingLeft:8,
        fontSize:20,
        height:35,
        width:'10%',
        justifyContent:'center',
        borderRadius:5,
        borderWidth:0.5,
        borderColor:'grey',
        textAlign:'center'
    }
})

export default Otpscreen;