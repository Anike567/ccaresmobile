import axios from 'axios';
import React, {useState, useContext, useEffect, useRef} from 'react';
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
import { View, ScrollView, StyleSheet} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; // For hide password
import { AntDesign } from '@expo/vector-icons'; // For show password
import { encode } from 'base-64';
import YearsContextProvider from '../store/context/serviceYears';
import { YearsOfServiceContext }  from '../store/context/serviceYears';

import {Camera, CameraType} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';


const Ccarescamscreen = ({navigation}) => {

    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.front);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(null);

    // useEffect(() => {
    //     (async () => {
    //         MediaLibrary.requestPermissionsAsync();
    //         const cameraStatus = await Camera.requestCameraPermissionsAsync();
    //         setHasCameraPermission(cameraStatus.status === 'granted'); 
    //     })();
    // },[])

    const takePicture = async () => {
        if(cameraRef) {
            try{
            const data = await cameraRef.current.takePictureAsync();
            console.log(data);
            setImage(data.uri);
            }
            catch(e){
                console.log(e); 
            }
        }
    }


    if(!hasCameraPermission){
        return (
             <View>
 
             </View>
        ) 
    }
    else{
        return (
            <View style={styles.container}>
                <Camera 
                    style = {styles.camera}
                    type = {type}
                    flashMode = {flash}
                    ref={cameraRef}
                >

                </Camera>
        </View>
        )
    }
    

};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff',
        justifyContent:'center',
    },
    camera: {
        flex:1,
        borderRadius: 20,
    }
});

export default Ccarescamscreen;