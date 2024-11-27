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
import { View, Text, Pressable, Keyboard, TextInput, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; // For hide password
import { AntDesign } from '@expo/vector-icons'; // For show password
import { Directions } from "react-native-gesture-handler";
import OTPInputView from '@twotalltotems/react-native-otp-input'
import OTPInput from "../components/OTPInput";
import YearsContextProvider from '../store/context/serviceYears';
import { YearsOfServiceContext }  from '../store/context/serviceYears';
import qs from "qs";
import Animated from "react-native-reanimated";



const {brand, darkLight} = Colors;

const Forgotpasswordotpscreen = ({navigation, route}) => {

    
    

    const [isVisible, setIsVisible] = useState(false);
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
        formData.append('cmpfoAccNO',route.params.accountNo)
        formData.append('otp',otpToSend)
        console.log(formData)
        axios.post(
            'http://10.180.146.24:5086/member/verify/otp',
                formData, {headers: {'Content-Type': 'multipart/form-data',},}
        )
        .then(data => {
            const d = data.data
            console.log(d);
            if (d["http-status"] === "OK"){
                formJSON = {
                    "loginId": route.params.accountNo,
                    "password": route.params.pwd
                }
                console.log(formJSON)
                axios.post(
                    `http://10.180.146.24:5086/member/enrollment`,
                    formJSON,
                    {
                        headers: {
                          "Content-Type": "application/json",
                        },
                    }
                )
                .then(data => {
                    setIsVisible(true);
                    // setOtpErrorMessage('Enrolment Successful');
                })
                .catch(e => {
                    setOtpErrorMessage('Problem with authtoken or navigation');
                    console.log(e);
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
            
            <Subtitle>Enter 6-digit code received on your mobile for enrolment</Subtitle>
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

            <View style={[styles.background]}>
                { isVisible && 
                <View style={styles.wrap}>
                    <Text style={styles.text}>Enrolment Successful</Text>  
                    <View style={{flexDirection:"row"}}>
                        <TouchableOpacity style={[styles.modalButton,styles.center]}>
                            <Text>Home</Text>
                        </TouchableOpacity>
                    </View>         
                </View> }
            </View>

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
        borderRadius:5,
        borderWidth:0.5,
        borderColor:'grey',
        textAlign:'center'
    },
    wrap:{
        padding:20,
        margin:50,
        borderRadius:8,
        backgroundColor:'white',
        shadowColor:"#4048BF",
        shadowOffset:{
            width:8.4,
            height:8.4
        },
        shadowOpacity:0.74,
        shadowRadius:30,
        elevation:10,
        height:220,
        width:300
    },
    text:{
        textAlign:"center",
        fontSize:28.8,
        color:"green",
        fontWeight:"500",
        // fontFamily:"Avenir"
    },
    modalButton:{
        alignItems:"center",
        backgroundColor:"transparent",
        borderRadius:3,
        borderColor:"#6D28D9",
        marginTop:34,
        borderWidth:1,
        paddingTop:5,
        paddingBottom:10,
        paddingLeft:20,
        paddingRight:20,
        marginHorizontal:40,
        flex:1
    },
    background:{
        position:"absolute",
        left:0,
        right:0,
        top:0,
        bottom:0,
        alignItems:"center",
    }
})

export default Forgotpasswordotpscreen;