import React, {useState, useEffect, useLayoutEffect} from 'react';
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
import { View, Button, Text} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; // For hide password
import { AntDesign } from '@expo/vector-icons'; // For show password
import { FlatList } from 'react-native-gesture-handler';
import Accountsummarycard from '../components/AccountSummaryCard';
import Accountsummaryheadercard from '../components/AccountSummaryHeaderCard';


const {brand, darkLight} = Colors;

const AccountSummary = ({navigation, route}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [accountData, setAccountData] = useState([]);

    

    function getAccountData()
    {
         return {
                 'data':[
                 {
                     'cmpfAccNo':'CDAC/1/2345',
                     'fullName': 'Aparichit Patra',
                     'currPeriodEnd': '1993-03-31',
                     'closingBal': 2420
                 }
                 ],
                 'http-status': 'OK',
                 'message': 'Account Summary successful'
             };
    }
 
    const fetchAccountData = () => {
        const data = getAccountData().data;
        setAccountData(data);
    };

    const renderItem = ({ item }) => (
        <View>
        <Accountsummaryheadercard heading='CMPF Account Number' />
        < Accountsummarycard  v={item.cmpfAccNo} />
        <Accountsummaryheadercard heading='Full Name' />
        < Accountsummarycard v={item.fullName} />
        <Accountsummaryheadercard heading='Last Current Period' />
        < Accountsummarycard  v={item.currPeriodEnd} />
        <Accountsummaryheadercard heading='Current PF Balance' />
        < Accountsummarycard  v={'\u20B9 ' + item.closingBal.toString() + '.00'} />
        </View>
        
    );

    useEffect(() => {
       
        fetchAccountData();
    }, []);

    function forgotpasswordhandler()
    {
        navigation.navigate('ForgotPassword');
    }


    return (
        <StyledContainer>
            <InnerContainer>
               
                 <View>
                    <FlatList
                        data={accountData}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
             
              
            </InnerContainer>
        </StyledContainer>
    );
};


export default AccountSummary; 