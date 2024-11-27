import React, {useContext, useState, useEffect, useLayoutEffect} from 'react';
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
import { YearsOfServiceContext }  from '../store/context/serviceYears';
import { useNavigation, useRoute } from '@react-navigation/native';

const {brand, darkLight} = Colors;

const PFyearwisedetails = ({route}) => {

    // const { subsectionclicked } = route.params;
    const navigation = useNavigation();
    const yearsContext = useContext(YearsOfServiceContext);

    // useLayoutEffect(() => { 
    //     navigation.setOptions({
    //       title: yearsContext.pfDisplayyear, // Set the title dynamically
    //     });
    // }, []); 
    
    const [hidePassword, setHidePassword] = useState(true);
    const [accountData, setAccountData] = useState([]);

    
    function getAccountData()
    {
         return yearsContext.yearsOfService;
    }


    const fetchAccountData = () => {
        const data = getAccountData();
        setAccountData(data);
    };


    useEffect(() => {
        navigation.navigate('PFyearwisedetails');
        fetchAccountData();
        navigation.setOptions({
            title: yearsContext.pfDisplayyear, // Set the title dynamically
          });
    }, [yearsContext.pfDisplayyear]);      

    
    const renderItem = ({ item }) => (
        <View>
        {
            Object.entries(item).map(([k,v]) => (
                <>
                    <Accountsummaryheadercard keyc={k} heading={k} />    
                    <Accountsummarycard keyc={k} v={v} />
                </>
            ))
        } 
        </View>
        
    );

  

    function forgotpasswordhandler()
    {
        navigation.navigate('ForgotPassword');
    }


    return (
        <StyledContainer>
            <InnerContainer>
               
                 <View>
                    <FlatList
                        data={accountData.filter(
                            item => item.currPeriodEnd.substring(0,4) === yearsContext.pfDisplayyear
                        )}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}   
                    />
                </View>
             
              
            </InnerContainer>
        </StyledContainer>
    );
};


export default PFyearwisedetails;