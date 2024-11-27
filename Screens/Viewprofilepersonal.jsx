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

const Viewprofilepersonal = ({navigation, route}) => {
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
        <Accountsummaryheadercard heading='Salutation' />
        < Accountsummarycard  v={item.titleId} />
        <Accountsummaryheadercard heading='Full Name' />
        < Accountsummarycard v={item.fullName} />
        <Accountsummaryheadercard heading='Date Of Birth' />
        < Accountsummarycard  v={item.dateOfBirth} />
        <Accountsummaryheadercard heading='PAN' />
        < Accountsummarycard  v={item.panNo} />
        <Accountsummaryheadercard heading='Aadhaar' /> 
        < Accountsummarycard  v={item.aadhaarNumber} />
        <Accountsummaryheadercard heading='Marital Status' />
        < Accountsummarycard  v={item.maritalStatus} />
        <Accountsummaryheadercard heading='Religion' />
        < Accountsummarycard  v={item.religionName} />
        <Accountsummaryheadercard heading='Gender' />
        < Accountsummarycard  v={item.gender} />
        <Accountsummaryheadercard heading='Father/Husband Name' />
        < Accountsummarycard  v={item.fatherHusbandName} />
        <Accountsummaryheadercard headingk='Email' />
        < Accountsummarycard  v={item.email} />
        <Accountsummaryheadercard heading='Mobile' />
        < Accountsummarycard  v={item.mobileNo} />
        <Accountsummaryheadercard heading='Landline' />
        < Accountsummarycard  v={item.landNo} />
        <Accountsummaryheadercard heading='Permanent Address' />
        < Accountsummarycard  v={
            (item.addressL1? item.addressL1.toString()+'\n':'') +
            (item.addressL2 ? item.addressL2.toString()+'\n':'')+
            (item.village ? item.village.toString()+'\n':'')+
            (item.city ? item.city.toString()+'\n':'')+
            (item.district ? item.district.toString()+'\n':'')+
            (item.state ? item.state.toString()+'\n':'')+
            (item.country ? item.country.toString()+'\n':'')+
            (item.pincode ? item.pincode.toString():'')
        }
        />
       
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


export default Viewprofilepersonal;