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

const Appendix = ({navigation}) => {

    return (
        <StyledContainer>    
            <InnerContainer>
                <PageLogo resizeMode='cover' source={require('../assets/cdac.jpg')}/>
                {/* <PageTitle>C-CARES</PageTitle> */}
                  

                <StyledButton >
                    <ButtonText>Appendix</ButtonText>
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

export default Appendix;