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

const Viewprofileemployment = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [accountData, setAccountData] = useState([]);

    function getAccountData()
    {
         return {
            "data": [
                {
                    "titleId": 3,
                    "fullName": "Aparichit Patra",
                    "fatherHusbandName": "Anjaan Patra",
                    "gender": " ",
                    "maritalStatus": "M",
                    "religionName": "Hindu",
                    "dateOfBirth": null,
                    "addressL1": "MOHULPALLI",
                    "addressL2": "0",
                    "village": "ARAKHAPUR",
                    "city": null,
                    "district": null,
                    "state": "Odisha",
                    "country": "INDIA",
                    "pincode": 761117,
                    "mobileNo": 7749996142,
                    "landNo": null,
                    "email": "shouviksarkar95@gmail.com",
                    "panNo": "ABCDE1234A",
                    "aadhaarNumber": "987654321012",
                    "cmpfAccNo": "CDAC/1/2345",
                    "employeeId": null,
                    "unitId": 545,
                    "unitName": "SODEPUR-AHQ",
                    "name": "ECL",
                    "joiningDate": "1992-01-12",
                    "pfStartDate": "1992-01-12",
                    "pfEndDate": "2029-10-31"
                }
            ],
            "http-status": "OK",
            "message": "Member Profile sucessfull"
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
        <Accountsummaryheadercard heading='Employee ID' />
        < Accountsummarycard  v={item.employeeId} />
        <Accountsummaryheadercard heading='Colliery ID' />
        < Accountsummarycard  v={item.unitId} />
        <Accountsummaryheadercard heading='Colliery Name' />
        < Accountsummarycard  v={item.unitName} />
        <Accountsummaryheadercard heading='Coal Company' />
        < Accountsummarycard  v={item.name} />
        <Accountsummaryheadercard heading='PF Start Date' />
        < Accountsummarycard  v={item.pfStartDate} />
        <Accountsummaryheadercard heading='Joining Date' />
        < Accountsummarycard  v={item.pfStartDate} />  
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


export default Viewprofileemployment;