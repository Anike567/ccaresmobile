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

const Koylamitrascreen = ({navigation}) => {
   
    function getDoubleDigits(d){
        if(d.length === 1)
            return '0'+d;  
        return d;
    }


    const now = new Date()
    // const displayData = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${getDoubleDigits(now.getHours().toString())}:${getDoubleDigits(now.getMinutes().toString())}`;
    
    const displayData = `  ${getDoubleDigits(now.getDate().toString())}/${getDoubleDigits((now.getMonth() + 1).toString())}/${now.getFullYear()} ${getDoubleDigits(now.getHours().toString())}:${getDoubleDigits(now.getMinutes().toString())}`

    const yearsContext = useContext(YearsOfServiceContext);
    const [currentChatMessage, setCurrentChatMessage] = useState('')
    const [chatHistory, setChatHistory] = useState([{
        time:displayData, 
        role:'model','message':'Hi, \nI am Koyla Mitra.\nChoose the section you want to expand'
    },
    // {
    //     time:displayData, 
    //     role:'model','message':'1. Paragraph1 \n2. Paragraph2 \n3. Paragraph3'
    // }
]);
    const [displayActivityIndicator, setDisplayActivityIndicator] = useState(false)
    
    
    const scrollViewRef = useRef(null);
    const scrollToBottom = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    };
    



    function inputMessageHandler(){

        // scrollToBottom();
        const queryNow = new Date()
        // const displayQueryData = `${queryNow.getDate()}/${queryNow.getMonth() + 1}/${queryNow.getFullYear()} ${getDoubleDigits(queryNow.getHours().toString())}:${getDoubleDigits(queryNow.getMinutes().toString())}`;
        const displayQueryData = `${getDoubleDigits(queryNow.getDate().toString())}/${getDoubleDigits((queryNow.getMonth() + 1).toString())}/${queryNow.getFullYear()} ${getDoubleDigits(queryNow.getHours().toString())}:${getDoubleDigits(queryNow.getMinutes().toString())}  `

        setDisplayActivityIndicator(true);
        
        chatHistory.push({'time':displayQueryData, 'role':'user','message':currentChatMessage})
        // setChatHistory([...chatHistory,{'role':'user','message':currentChatMessage}])    
        formJSON = {
            // "loginId": yearsContext.loginId,
            "loginId": 'CDAC/1/2345',
            "userMessage":currentChatMessage
        }
    axios.post(`http://10.180.146.63:2888/claims-stats/sendchatmessage/`, formJSON)
    .then(data => {

        setDisplayActivityIndicator(false);
        
        
        const replyNow = new Date()
        const displayReplyData = ` ${getDoubleDigits(replyNow.getDate().toString())}/${getDoubleDigits((replyNow.getMonth() + 1).toString())}/${replyNow.getFullYear()} ${getDoubleDigits(replyNow.getHours().toString())}:${getDoubleDigits(replyNow.getMinutes().toString())}`;

        // chatHistory.push({'role':'user','message':data.data.entities})
        const botResponse = data.data.entities;
        botResponse.time = displayReplyData;

        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        
        const renderNewItem = async() => {
            const botMessage = botResponse.message
            var constructingMessage = ''
            var newHistory=''
            for(let c in botMessage)
            {
                constructingMessage+=botMessage[c]
                botResponse.message = constructingMessage
            
                newHistory = [...chatHistory, botResponse]
                setChatHistory(newHistory);
                // scrollToBottom();
                await delay(50); 
                newHistory = newHistory.slice(0,-1);
            }
        } 

        renderNewItem();
        

    })
    .catch(e => {
            console.log('Error sending user message in chat')
            console.log(e)
            setDisplayActivityIndicator(false);
    })}

    // const chatrenderer = ({ item }) => (
    //     <View style={styles.box}>
    //         <Text style={item.role === 'user'? styles.boxUser :styles.boxModel}>{item.message}</Text>
    //     </View>
    
    // );

    return(        
        <View style={styles.wrapper}>
            <View style={[styles.wrapper,{paddingVertical:20, paddingHorizontal:10}]}>
                <FlatList
                        data={chatHistory}
                        renderItem={
                            ({ item }) => (
                                <View style={styles.box}>
                                    <View style={item.role === 'user'? styles.userIcon :styles.modelIcon}>
                                        {item.role === 'user'? <Chatrenderer role='user' time={item.time}/> :<Chatrenderer role='model' time={item.time}/>}
                    
                                    </View>
                                    <Text style={item.role === 'user'? styles.boxUser :styles.boxModel}>
                                        {item.message}
                                    </Text>
                                    <Pressable 
                                        style={styles.optionbutton}
                                        onPress={inputMessageHandler}
                                    >
                                        <Text style={styles.buttonText}>Paragraph 1</Text>    
                                    </Pressable>
                                    <Pressable 
                                        style={styles.optionbutton}
                                        onPress={inputMessageHandler}
                                    >
                                        <Text style={styles.buttonText}>Paragraph 2</Text>    
                                    </Pressable>
                                    <Pressable 
                                        style={styles.optionbutton}
                                        onPress={inputMessageHandler}
                                    >
                                        <Text style={styles.buttonText}>Paragraph 3</Text>    
                                    </Pressable>                    

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
            {/* <View style={styles.messageInputContainer}>
                
                
                <TextInput
                    style={styles.messageInput}
                    value={currentChatMessage}
                    onChangeText = {value => {
                        setCurrentChatMessage(value)
                    }}
                    placeholder="Enter your message......"
                />

                <Pressable 
                    style={styles.buttonMic}
                    // onPress={inputMessageHandler}
                >
                    <Text style={styles.buttonText}><Feather name="mic" size={24} color="black" /></Text>
                    
                </Pressable>
                <Pressable 
                    style={styles.button}
                    onPress={inputMessageHandler}
                >
                        <Text style={styles.buttonText}>Send</Text>
                    
                </Pressable>
                

            </View> */}
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
    optionbutton:{
        alignItems:'center',
        marginVertical: 1,
        backgroundColor: '#6D28D9', // Background color for the button
        paddingVertical: 5, // Vertical padding for the button
        paddingHorizontal: 20, // Horizontal padding for the button
        borderRadius: 5, // Rounded corners for the button
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
    boxUser:{
        backgroundColor: '#301934',
        color:'#fff',
        width:'100%',
        // height:'30%',
        padding:7,
        borderRadius:2
    },
    boxModel:{
        backgroundColor: '#CBC3E3',
        width:'100%',
        // height:'30%',
        padding:7,
        borderRadius:2
    },
    box: {
        marginBottom:3
    },
});

export default Koylamitrascreen;