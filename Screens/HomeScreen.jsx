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

const Homescreen = ({navigation}) => {

    const yearsContext = useContext(YearsOfServiceContext);
    const [hidePassword, setHidePassword] = useState(true);

    const [responseMessageAfterSendingCreds, setResponseMessageAfterSendingCreds] = useState('')

    function memberenrolmenthandler()
    {
        navigation.navigate('Memberenrolment');
    }
    function memberlogindhandler()
    {
        navigation.navigate('Login');
    }
    function grievancehandler()
    {
        navigation.navigate('Grievance');
    }
    function usermanualhandler()
    {
        navigation.navigate('Usermanualdrawer');
    }
    function ccarescamhandler()
    {
        navigation.navigate('Ccarescam');
    }
    function ccaresgpthandler()
    {
        navigation.navigate('Ccaresgpt');
    }

    function chathandler()
    {
        navigation.navigate('Koylamitra');
    }

 
    return (
        <StyledContainer>    
            <InnerContainer>
                <PageLogo resizeMode='cover' source={require('../assets/flyingbirds2.gif')}/>
                
                {/* <PageTitle>C-CARES</PageTitle> */}
                  

                <StyledButton onPress={memberenrolmenthandler}>
                    <ButtonText>Member Enrolment</ButtonText>
                </StyledButton>
                <StyledButton onPress={memberlogindhandler}>
                    <ButtonText>Member Login</ButtonText>
                </StyledButton>
                <StyledButton onPress={grievancehandler}>
                    <ButtonText>Grievance</ButtonText>
                </StyledButton>
                <StyledButton onPress={usermanualhandler}>
                    <ButtonText>User Manual</ButtonText>
                </StyledButton>
                <StyledButton onPress={ccaresgpthandler}>
                    <ButtonText>Ccares-Assist</ButtonText>
                </StyledButton>
                {/* <StyledButton onPress={ccarescamhandler}>
                    <ButtonText>CcaresCam</ButtonText>
                </StyledButton>
                 */}
                 <StyledButton onPress={chathandler}>
                    <ButtonText>Koyla Mitra (कोयला मित्र)</ButtonText>
                </StyledButton>
                
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

export default Homescreen;