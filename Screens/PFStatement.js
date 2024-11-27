import React, {useState} from 'react';
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
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; // For hide password
import { AntDesign } from '@expo/vector-icons'; // For show password

const {brand, darkLight} = Colors;

const Pfstatement = () => {
    const [hidePassword, setHidePassword] = useState(true);

    return (
        <StyledContainer>
            <InnerContainer>
                <PageLogo resizeMode='cover' source={require('../assets/cdac.jpg')}/>
                <PageTitle>C-CARES</PageTitle>
                <Subtitle>Member Login</Subtitle>

                <Formik
                    initialValues={{accountno: '',password: ''}}
                    onSubmit={(values) => {
                        console.log(values);
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

                        <MsgBox>...</MsgBox>

                        <StyledButton onPress={handleSubmit}>
                            <ButtonText>Send OTP</ButtonText>
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

export default Pfstatement;