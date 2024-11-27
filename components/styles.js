import styled from 'styled-components';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import  Constants  from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;

export const Colors = {
    primary: '#ffffff',
    secondary: 'lightgray',
    tertiary: '#1F2937',
    darkLight: '#9CA3AF',
    brand: '#6D28D9',
    green: '#10B981',
    red: '#EF4444'
};

const {
    primary,
    secondary,
    tertiary,
    darkLight,
    brand,
    green,
    red
} = Colors;

export const StyledContainer = styled.View`
    flex:1;
    padding:25px;
    background-color: ${primary};
    padding: ${StatusBarHeight + 10}px;
`

export const InnerContainer = styled.View`
    flex:1;
    width:100%;
    align-items:center;
`

export const PageLogo = styled.Image`
    width:250px;
    height:150px;
`

export const PageTitle = styled.Text`
    font-size: 30px;
    text-align:center;
    font-weight:bold;
    color: ${brand};
    padding: 5px;
`

export const Subtitle = styled.Text`
    font-size:18px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${tertiary};
`

export const StyledFormArea = styled.View`
    width:90%;
`

export const StyledTextInput = styled.TextInput`
    background-color: ${secondary};
    padding: 15px;
    padding-left: 55px;
    padding-right: 55px;
    border-radius: 5px;
    font-size: 16px;
    height: 60px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    color: ${tertiary};
`

export const StyledInputLabel = styled.Text`
    color: ${tertiary};
    font-size: 13px;
    text-align: left;
`

export const LeftIcon = styled.View`
    left: 15px;
    top: 38px;
    position: absolute;
    z-index:1;
`

export const RightIcon = styled.TouchableOpacity`
    right: 15px;
    top: 38px;
    position: absolute;
    z-index:1;
`

export const StyledButton = styled.TouchableOpacity`
    width:100%;
    background-color: ${brand};
    justify-content:center;
    align-items: center;
    border-radius:5px;
    margin-vertical:5px;
    height:60px;

`


export const ButtonText = styled.Text`
    color: ${primary};
    font-size: 16px;
`


export const MsgBox = styled.Text`
    text-align: center;
    font-size: 13px;
    color:red;
`

export const Line = styled.View`
    height:1px;
    width:100%;
    background-color: ${darkLight};
    margin-vertical: 10px;
    
`

// OTP
export const OTPInputContainer = styled.View`
 justify-content: center;
 align-items: center;
 marginTop:80px;
`;

export const TextInputHidden = styled.TextInput`
position: absolute;
opacity: 0;
`;

export const SplitOTPBoxesContainer = styled.Pressable`
 position: absolute; 
 width: 100%;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
`;
export const SplitBoxes = styled.View`
    
border-color: '#e5e5e5';
 border-width: 1px;
 border-radius: 5px;
 padding: 20px;
 
`;

export const SplitBoxText = styled.Text`
 font-size: 20px;
 text-align: center;
 color: #e5e5e5;
`;

export const SplitBoxesFocused = styled(SplitBoxes)`
 border-color: #ecdbba;
 background-color: grey;
`;