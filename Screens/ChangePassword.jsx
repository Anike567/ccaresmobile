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

const Changepassword = ({navigation}) => {
    
    const [hideOldPassword, setHideOldPassword] = useState(true);
    const [hideNewPassword, setHideNewPassword] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

    function forgotpasswordhandler()
    {
        navigation.navigate('ForgotPassword');
    }

    function loginbuttonhandler()
    {
        navigation.navigate('DrawerNavigator')
    }

    return (
        <StyledContainer>
            <InnerContainer>
       
                <Formik
                    initialValues={{accountno: '',oldpassword: '',newpassword: '',confirmpassword: ''}}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    {({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>
                        
                        < MyTextInput 
                            label="Old Password"
                            icon="lock"
                            onChangeText={handleChange('oldpassword')}
                            value = {values.oldpassword}
                            secureTextEntry = {hideOldPassword}
                            isPassword={true}
                            hidePassword={hideOldPassword}
                            setHidePassword={setHideOldPassword}
                        />
                        < MyTextInput 
                            label="New Password"
                            icon="lock"
                            onChangeText={handleChange('newpassword')}
                            value = {values.newpassword}
                            secureTextEntry = {hideNewPassword}
                            isPassword={true}
                            hidePassword={hideNewPassword}
                            setHidePassword={setHideNewPassword}
                        />
                        < MyTextInput 
                            label="Confirm Password"
                            icon="lock"
                            onChangeText={handleChange('confirmpassword')}
                            value = {values.confirmpassword}
                            secureTextEntry = {hideConfirmPassword}
                            isPassword={true}
                            hidePassword={hideConfirmPassword}
                            setHidePassword={setHideConfirmPassword}
                        />
                        <MsgBox>...</MsgBox>

                        <StyledButton onPress={loginbuttonhandler}>
                            <ButtonText>CHANGE PASSWORD</ButtonText>
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

export default Changepassword;