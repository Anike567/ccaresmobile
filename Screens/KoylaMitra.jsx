import axios from 'axios';
import React, {useState, useContext, useEffect, useRef, useCallback} from 'react';

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
import { View, ScrollView, StyleSheet, Pressable, TextInput, Text, Modal, ActivityIndicator} from 'react-native';
import { FlatList, Gesture } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; // For hide password
import { AntDesign } from '@expo/vector-icons'; // For show password
import { encode } from 'base-64';
import YearsContextProvider from '../store/context/serviceYears';
import Chatrenderer  from '../components/chatRenderer'
import { YearsOfServiceContext }  from '../store/context/serviceYears';

import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { ProvidentFundHandler} from '../components/PFBotComponents'
// import { OptionButtonView, PlainTextView } from '../components/KoylamitraMenus';

const getDoubleDigits = d =>
    {
        if(d.length === 1)
            return '0'+d;  
        return d;
    }


const Koylamitrascreen = ({navigation}) => {
   
    const valueRef = useRef(0);   
    const now = new Date()
    const displayData = `  ${getDoubleDigits(now.getDate().toString())}/${getDoubleDigits((now.getMonth() + 1).toString())}/${now.getFullYear()} ${getDoubleDigits(now.getHours().toString())}:${getDoubleDigits(now.getMinutes().toString())}`

    const yearsContext = useContext(YearsOfServiceContext);
    const [textToType, setTextToType] = useState(false)
    const [sendText, setSendText] = useState('')
    const [currentChatMessage, setCurrentChatMessage] = useState('')
    const [chatHistory, setChatHistory] = useState([
        {
            time:displayData, 
            type:'plaintext',
            message:'Hello, \nI am Koyla Mitra.\nHow can I help you ?',
            entity:'agent',
            disabled: false
        },
        {
            time:displayData, 
            type:'option',
            message:'Provident Fund',
            handler: 'pfHandler',
            entity: null,
            disabled: false
        },
        {
            time:displayData, 
            type:'option',
            message:'Pension',
            handler: 'pensionHandler',
            entity: null,
            disabled: false
        },
        {
            time:displayData, 
            type:'option',
            message:'Advance',
            handler: 'advanceHandler',
            entity: null,
            disabled: false
        },
]);

    const disablePastInteractionsButtons = () => {

        var chatHistoryContainer = []
        for (let i = 0; i < chatHistory.length; i++) {
            chatHistoryContainer.push(chatHistory[i])
        }

        setChatHistory([])
        for (let i = 0; i < chatHistoryContainer.length; i++) {
            if(chatHistoryContainer[i]['type'] === 'option'){
                chatHistoryContainer[i]['disabled'] = true
            }
            setChatHistory((prevC) => [...prevC,chatHistory[i]])
        }

        
    }



    const mainMenuHandler = () => {

        disablePastInteractionsButtons()
        setChatHistory((prevC) => [...prevC, 
            {
                time:displayData, 
                type:'plaintext',
                message:'Back to Main Menu',
                entity:'agent'
            },
            {
                time:displayData, 
                type:'option',
                message:'Provident Fund',
                handler: 'pfHandler',
                entity: null,
                disabled: false
            },
            {
                time:displayData, 
                type:'option',
                message:'Pension',
                handler: 'pensionHandler',
                entity: null,
                disabled: false
            },
            {
                time:displayData, 
                type:'option',
                message:'Advance',
                handler: 'advanceHandler',
                entity: null,
                disabled: false
            },
        ])

    }



    const [displayActivityIndicator, setDisplayActivityIndicator] = useState(false)
    
    const scrollViewRef = useRef(null);
    const scrollToBottom = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    };
    
////////////////////////////////////// Message Display Components ///////////////////////////
    const OptionButtonView = (props) => 
    {
        
        const PensionHandler = () => {
        
            const queryNow = new Date()
            const displayQueryData = `${getDoubleDigits(queryNow.getDate().toString())}/${getDoubleDigits((queryNow.getMonth() + 1).toString())}/${queryNow.getFullYear()} ${getDoubleDigits(queryNow.getHours().toString())}:${getDoubleDigits(queryNow.getMinutes().toString())}  `
            setChatHistory((prevC) => [...prevC, {'time':displayQueryData, 'type':'plaintext','message':'Pension'}])
        }
    
    
        const ProvidentFundHandler = () => { 
        
            const queryNow = new Date()
            const displayQueryData = `${getDoubleDigits(queryNow.getDate().toString())}/${getDoubleDigits((queryNow.getMonth() + 1).toString())}/${queryNow.getFullYear()} ${getDoubleDigits(queryNow.getHours().toString())}:${getDoubleDigits(queryNow.getMinutes().toString())}  `
            
            disablePastInteractionsButtons()
            setChatHistory((prevC) => [...prevC, {'time':displayQueryData, 'type':'plaintext','message':'Provident Fund','entity':'human'}])
            setChatHistory((prevC) => [...prevC, {'handler':'pfopeningbalancehandler','time':displayQueryData, 'type':'option','message':'Opening Balance','entity':null, disabled:false}])
            setChatHistory((prevC) => [...prevC, {'handler':'pfopeningbalancehandler','time':displayQueryData, 'type':'option','message':'Closing Balance','entity':null, disabled:false}])
            setChatHistory((prevC) => [...prevC, {'handler':'pfopeningbalancehandler','time':displayQueryData, 'type':'option','message':'Rate Of Interest','entity':null, disabled:false}])
            setChatHistory((prevC) => [...prevC, {'handler':'mainmenuhandler','time':displayQueryData, 'type':'option','message':'Main Menu','entity':null, disabled:false}])
           
        }   
    
        const AdvanceHandler = () => {
        
            const queryNow = new Date()
            const displayQueryData = `${getDoubleDigits(queryNow.getDate().toString())}/${getDoubleDigits((queryNow.getMonth() + 1).toString())}/${queryNow.getFullYear()} ${getDoubleDigits(queryNow.getHours().toString())}:${getDoubleDigits(queryNow.getMinutes().toString())}  `
    
            setChatHistory((prevC) => [...prevC, {'time':displayQueryData, 'type':'plaintext','message':'Advance'}])
        }
    
        const PFOpeningBalanceHandler = () => {
    
            const queryNow = new Date()
            const displayQueryData = `${getDoubleDigits(queryNow.getDate().toString())}/${getDoubleDigits((queryNow.getMonth() + 1).toString())}/${queryNow.getFullYear()} ${getDoubleDigits(queryNow.getHours().toString())}:${getDoubleDigits(queryNow.getMinutes().toString())}  `
    
            disablePastInteractionsButtons()
            setChatHistory((prevC) => [...prevC, {'handler':'pfopeningbalancetexthandler', 'time':displayQueryData, 'type':'plaintext','message':'PF Opening Balance','entity':'human'}])
            setChatHistory((prevC) => [...prevC, {'handler':'pfopeningbalancetexthandler', 'time':displayQueryData, 'type':'plaintext','message':'Enter year','entity':'agent'}])
    
            setTextToType(true)
        }
    
        
        
        const handlerMaps = {
            'pfHandler':ProvidentFundHandler,
            'pensionHandler':PensionHandler,
            'advanceHandler':AdvanceHandler,               
            'pfopeningbalancehandler':PFOpeningBalanceHandler,
            'mainmenuhandler': mainMenuHandler
        }
    
    
            return(
                <Pressable 
                    style={props.disabled === true? styles.disabledoptionbutton:styles.enabledoptionbutton}
                    onPress={handlerMaps[props.handler]}
                    disabled={props.disabled}
                >
                    <Text style={props.disabled === true?{color:"#6D28D9"}:{color:"white"}}>{props.message}</Text>    
                </Pressable>
            )
        }
        
        const PlainTextView = (props) =>
        {
            return(
                <View>
                    {props.entity === "agent"? <View style={{flexDirection: 'row'}}><FontAwesome5 name="robot" size={24} color="black" /><Text>{props.time}</Text></View>: null}
                    {props.entity === "human"? <View style={{flexDirection: 'row', justifyContent:'flex-end'}}><Text>{props.time}</Text><MaterialCommunityIcons name="human" size={24} color="black" /></View> : null}
                   
                    <Text style={props.entity === 'agent'? styles.boxAgent:styles.boxUser}>
                    {props.message}
                </Text>
                </View>
                
            )
            
        }
        
////////////////////////////////////// Message Display Components ///////////////////////////

    const PFOpeningBalanceTextHandler = () => {

        const now = new Date()
        const displayData = `  ${getDoubleDigits(now.getDate().toString())}/${getDoubleDigits((now.getMonth() + 1).toString())}/${now.getFullYear()} ${getDoubleDigits(now.getHours().toString())}:${getDoubleDigits(now.getMinutes().toString())}`

        disablePastInteractionsButtons()
        var dataToPush = [{
            time:displayData, 
            type:'plaintext',
            message:sendText,
            entity:'human'
        },
        {
            time:displayData, 
            type:'plaintext',
            message:'Your PF opening balance for the year 2010 is Rs. 12000',
            entity:'agent'
        },
        {'handler':'pfopeningbalancehandler','time':displayData, 'type':'option','message':'Opening Balance','entity':null, disabled:false},
        {'handler':'pfopeningbalancehandler','time':displayData, 'type':'option','message':'Closing Balance','entity':null, disabled:false},
        {'handler':'pfopeningbalancehandler','time':displayData, 'type':'option','message':'Rate Of Interest','entity':null, disabled:false},
        {'handler':'mainmenuhandler','time':displayData, 'type':'option','message':'Main Menu','entity':null, disabled:false}
        ]

        dataToPush.forEach(i => setChatHistory(prevC => [...prevC, i]))
        setTextToType(false)
    }

    const handlerMaps = {
        'pfopeningbalancetexthandler': PFOpeningBalanceTextHandler
    }

    const Sendcomponent = (props) => {
        return (
        <View style={styles.messageInputContainer}>
                <TextInput
                    style={styles.messageInput}
                    value={sendText}
                    onChangeText = {setSendText}
                    placeholder="Please enter input here....."
                    keyboardType='numeric'
                />

                <Pressable 
                    style={styles.button}
                    onPress={handlerMaps[props.inputhandler]}
                >
                        <Text style={styles.buttonText}>Send</Text>
                    
                </Pressable> 
                

            </View>)
    }
    
    return(        
        <View style={styles.wrapper}>
            <View style={[styles.wrapper,{paddingVertical:20, paddingHorizontal:10}]}>
                <FlatList
                        data={chatHistory}
                        renderItem={
                            ({ item }) => (
                                <View style={styles.box}>
                                    <View >
                                        {item.type === 'plaintext'? <PlainTextView message={item.message} time={item.time} entity={item.entity}/> : <OptionButtonView history={chatHistory} seth={setChatHistory} valueref={valueRef} handler={item.handler} message={item.message} time={item.time} entity={item.entity} setTextToType={setTextToType} disabled={item.disabled}/>}
                                    </View>
                                </View>
                            )
                        }
                        keyExtractor={(item, index) => index.toString()}
                        extraData={chatHistory}
                />
                
            </View>
            
                
            <View style = {styles.modalColor}> 
                <ActivityIndicator
                    size={'large'}
                    color='#6D28D9'
                    animating={displayActivityIndicator}
                >
                    
                </ActivityIndicator>
            </View>
            

            {/* For input text and send  */}

            {textToType ? <Sendcomponent inputhandler={chatHistory.at(-1)['handler']}/>: null} 
             
        </View>
        
    )

};

const styles = StyleSheet.create({
    userIcon:{
        flex:1,
        alignItems:'flex-end'
    },
    wrapper:{
        flex:1,
        backgroundColor:'#eee',
    },
    messageInputContainer:{
        flexDirection: 'row', // Set the direction to row
        alignItems: 'center', // Align items vertically centered
        padding: 10, // Optional: Add some padding
    },
    messageInput:{
        flex: 1, // Allow the TextInput to take up as much space as possible
        borderColor: '#ccc', // Optional: Add a border color
        borderWidth: 1, // Optional: Add a border width
        borderRadius: 5, // Optional: Add rounded corners
        paddingHorizontal: 10, // Add horizontal padding inside the input
        paddingVertical: 5, // Add vertical padding inside the input
        marginRight: 10, // Add some space between the input and the button
    },
    disabledoptionbutton:{
        alignItems:'center',
        marginVertical: 1,
        backgroundColor: '#D3D3D3', // Background color for the button
        color: 'black',
        paddingVertical: 5, // Vertical padding for the button
        paddingHorizontal: 20, // Horizontal padding for the button
        borderRadius: 1, // Rounded corners for the button
        width:'100%',
        borderColor: 'black',
        borderWidth: 1
    },
    enabledoptionbutton:{
        alignItems:'center',
        marginVertical: 1,
        backgroundColor: '#6D28D9', // Background color for the button
        paddingVertical: 5, // Vertical padding for the button
        paddingHorizontal: 20, // Horizontal padding for the button
        borderRadius: 2, // Rounded corners for the button
        width:'100%'
    },
    button:{
        backgroundColor: '#6D28D9', // Background color for the button
        paddingVertical: 10, // Vertical padding for the button
        paddingHorizontal: 20, // Horizontal padding for the button
        borderRadius: 5, // Rounded corners for the button
        width:'20%'
    },
    buttonText:{
        color: '#fff', // Text color for the button
        fontSize: 12, // Font size for the button text
    },
    buttonMic:{
        // backgroundColor: '#6D28D9',
        color: '#fff', // Text color for the button
        width:'12%',
        height:'100%',
        borderRadius: 25,
        padding:8,
        marginRight: 10,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // Elevation property for Android
        // elevation: 5,
    },
    boxAgent:{
        backgroundColor: '#e6e6fa',
        color:'#000',
        width:'100%',
        // height:'30%',
        padding:7,
        borderRadius:2,
        borderWidth: 1
    },
    boxUser:{
        backgroundColor: '#CBC3E3',
        width:'100%',
        // height:'30%',
        padding:7,
        borderRadius:2,
        borderWidth: 1,
        borderColor: '#00008b'
    },
    box: {
        marginBottom:3
    },
});

export default Koylamitrascreen;