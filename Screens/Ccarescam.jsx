// import axios from 'axios';
// import React, {useState, useContext, useEffect, useRef} from 'react';
// import {
//     StyledContainer,
//     InnerContainer,
//     PageLogo,
//     PageTitle,
//     Subtitle,
//     StyledFormArea,
//     LeftIcon,
//     StyledInputLabel,
//     StyledTextInput,
//     RightIcon,
//     Colors,
//     StyledButton,
//     ButtonText,
//     MsgBox,
//     Line
// } from '../components/styles';

// import { Formik } from 'formik';
// import { Platform, View, ScrollView, StyleSheet, Dimensions, LogBox} from 'react-native';
// import { MaterialCommunityIcons } from '@expo/vector-icons'; 
// import { Entypo } from '@expo/vector-icons'; // For hide password
// import { AntDesign } from '@expo/vector-icons'; // For show password
// import { encode } from 'base-64';
// import YearsContextProvider from '../store/context/serviceYears';
// import { YearsOfServiceContext }  from '../store/context/serviceYears';

// import {Camera, CameraType} from 'expo-camera';
// import * as MediaLibrary from 'expo-media-library';
// import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
// import * as cocoSsd from '@tensorflow-models/coco-ssd';
// import * as tf from '@tensorflow/tfjs';


// const TensorCamera = cameraWithTensors(Camera)

// const { width, height } = Dimensions.get('window');

// LogBox.ignoreAllLogs(true);

// const Ccarescamscreen = () => {

//     const [model, setModel] = useState(cocoSsd.ObjectDetection());
//     let context = useRef();
//     let canvas = useRef() 


//     let textureDims = Platform.OS == 'ios' ? {height:1920, width:1080} : {height:1200, width: 1600}

//     function handleCameraStream() {
//         const loop = async() => {
//             const nextImageTensor = images.next().value;
//             if(!model || !nextImageTensor) throw new Error('No model or image tensor');
//             model.detect(nextImageTensor)
//             .then(prediction => {
//                 drawRectangle(prediction, nextImageTensor)
//             })
//             .catch(e => {
//                 console.log('Erro detecting');
//                 console.log(e);
//             })

//             requestAnimationFrame(loop);
//         }
//         loop();
//     }

//     function drawRectangle(){
//         if(!context.current || !canvas.current) return;
//         const scaleWidth = width / nextImageTensor.shape[1];
//         const scaleHeight = height / nextImageTensor.shape[0];

//         const flipHorizontal = Platform.OS == 'ios' ? false:true;

//         context.current.clearRect(0,0,width,height);

//         for(const prediction of predictions){
//             const [x, y, width, height] = prediction.bbox;
//             const boundingBoxX = flipHorizontal? canvas.current.width - x * scaleWidth - width * scaleWidth:x * scaleWidth;
//             const boundingBoxY = y * scaleHeight;

//             context.current.strokeRect(
//                 boundingBoxX, 
//                 boundingBoxY, 
//                 width * scaleWidth, 
//                 height * scaleHeight
//             );

//             context.current.strokeText(
//                 prediction.class,
//                 boundingBoxX - 5,
//                 boundingBoxY - 5
//             )
//         }
//     }

//     async function handleCanvas(can){
//         if(can){
//             can.width = width;
//             can.height = height;
//             const ctx = can.getContext('2d');
//             ctx.strokeStyle = 'red';
//             ctx.fillStyle = 'red';
//             ctx.lineWidth = 3;

//             context.current = ctx;
//             canvas.current = can;
//         }
//     }


//     useEffect(() => {
//         (async () => {
//             const { status } = await Camera.requestPermissionAsync();
//             await tf.ready();
//             setModel(await cocoSsd.load())
//         })();


//     },[]);


//     return (
//         <View style={styles.container}>
//             <TensorCamera style={styles.camera} 
//             type={Camera.Constants.Type.front}
//             cameraTextureHeight={textureDims.height}
//             cameraTextureWidth={textureDims.width}
//             resizeHeight={200}
//             resizeWidth={152}
//             resizeDepth={3}
//             onReady={handleCameraStream}
//             autorender={true}
//             useCustomShadersToResize={false}
//         />
//         <Canvas style={styles.canvas} ref={handleCanvas} />
//         </View>
        
//     )

// };

// const styles = StyleSheet.create({
//     container: {
//         flex:1,
//         backgroundColor:'#fff',
//     },
//     camera: {
//         width:'100%',
//         height: '100%'
//     },
//     canvas:{
//         position:'absolute',
//         zIndex: 10000000,
//         width:'100%',
//         height: '100%'
//     }
// });

// export default Ccarescamscreen;