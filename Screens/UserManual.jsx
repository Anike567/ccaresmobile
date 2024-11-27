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
// import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer';
import { createDrawerNavigator} from '@react-navigation/drawer';


const Drawer = createDrawerNavigator();
const {brand, darkLight} = Colors;

const Usermanual = ({navigation}) => {
    <Drawer.Navigator>
            <Drawer.Screen 
              name="Accountsummary" 
              component={AccountSummary}
              options = {{
                title:'Account Summary',
                drawerLabel: "Account Summary",
                headerTitleAlign: 'center'
              }}
              />
              <Drawer.Screen 
              name="Viewprofile" 
              component={MyTabs}
              options = {{
                title:'View Profile',
                drawerLabel: "View Profile",
                headerTitleAlign: 'center'
              }}
              />
              <Drawer.Screen 
              name="Changepassword" 
              component={Changepassword}
              options = {{
                title:'Change Password',
                drawerLabel: "Change Password",
                headerTitleAlign: 'center'
              }}
              />
              {/* <Drawer.Screen 
              name="SubsectionStack" 
              component={SubsectionStack} 
              options={{ 
                drawerLabel: () => null 
              }} 
              /> */}
               <Drawer.Screen 
              name="PFyearwisedetails" 
              component={PFyearwisedetails}
              options = {{
                // title: yearsContext.pfDisplayyear,
                headerTitleAlign: 'center',
                drawerLabel: () => null
              }}
              />
      </Drawer.Navigator>
  
}

export default Usermanual;