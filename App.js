import 'react-native-gesture-handler';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { StatusBar } from 'expo-status-bar';
import  React, { useContext, useEffect, useState} from 'react';
import Login from './Screens/MemberLogin';  
import ForgotPassword from './Screens/ForgotPassword';
import AccountSummary from './Screens/AccountSummary';
import Viewprofilepersonal from './Screens/Viewprofilepersonal';
import Viewprofileemployment from './Screens/Viewprofileemployment';
import Changepassword from './Screens/ChangePassword';
import PFyearwisedetails from './Screens/PFyearwisedetails';
import Homescreen from './Screens/HomeScreen';
import Pfstatement from './Screens/PFStatement';
import Usermanual from './Screens/UserManual';
import Memberenrolment from './Screens/MemberEnrolment';
import Otpscreen from './Screens/Otp';
import Overview from './Screens/Overview';
import Gettingstarted from './Screens/GettingStarted';
import Memberdashboard from './Screens/MemberDashboard';
import Appendix from './Screens/Appendix';
import Grievance from './Screens/Grievance';
import Enrolmentotpscreen from './Screens/EnrolmentOtp';
import Ccarescamscreen from './Screens/Ccarescam';
import Ccaresgptscreen from './Screens/Ccaresgpt';
import Koylamitrascreen from './Screens/KoylaMitra';
import { Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { drawerMenu } from './constants/constants';
import Row from './components/Row';
import YearsContextProvider from './store/context/serviceYears';
import { YearsOfServiceContext }  from './store/context/serviceYears';
import Usermanualheaderarrow from './components/Usermanualheaderarrow';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();

export default function App() {

  const [loginemail, loginsetemail] = React.useState("");
  const [loginpassword, loginsetpassword] = React.useState("");
  // const [subsectionclicked, setSubsectionClicked] = useState('');
 
  

  const sendLoginData = () => {
    LoginApiCall({"loginId":loginemail,"password":loginpassword,"role":"Member or Employee"})
  }

//////////// This part is required to create drawer /////////////////////////
function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Personal" component={Viewprofilepersonal} />
      <Tab.Screen name="Employment" component={Viewprofileemployment} />
    </Tab.Navigator>
  );
}



////////////////////////////////////////
function CustomDrawerContent1(props) {

  // 
  const { state, ...rest } = props;
  const newState = { ...state };
  newState.routes = newState.routes.filter(item => item.name !== 'PFyearwisedetails');


  const [subsectionclicked, setSubsectionClicked] = useState('');
  const [pfsubsection, changepfsubsectionstate] = useState(false)
  const yearsContext = useContext(YearsOfServiceContext);
  
  
  // For registering that one of the subsections has been clicked
  useEffect(() => {
    console.log(yearsContext.pfDisplayyear);
    if(subsectionclicked !== ''){
      props.navigation.navigate('PFyearwisedetails');
    }

  }, [subsectionclicked]); 

  return (
    <DrawerContentScrollView { ...props }>
      <DrawerItemList  { ...props} />
      <DrawerItem 
        label="PF Statement"
        onPress = {() => {
          changepfsubsectionstate(!pfsubsection);
        }}
      />
      {pfsubsection &&
        ( yearsContext.yearsOfService.map((item,index) => {
            return (
              <TouchableOpacity 
              onPress={() => {
                const yy = item.currPeriodEnd.substring(0, 4);
                yearsContext.setPFdisplayYear(yy);

                // Executing the below line is required because setState calls are asynchronous
                // the useEffect() used above ensures that the clicked subsection is registered
                setSubsectionClicked('c');
                // props.navigation.navigate('PFyearwisedetails');
              }} 
                key={index} style={{
                  backgroundColor: '#ccc',
                  marginHorizontal:15,
                  marginVertical:1,
                  borderRadius:2,
                }}
              >
              <Row>
                <Text style={{
                    paddingHorizontal:5,
                    paddingVertical:3
                  }}>{item.currPeriodEnd.substring(0, 4)}
                </Text>
             </Row>
          </TouchableOpacity>
        )
      })
    )}
      <DrawerItem
        label="Logout"
        onPress={() => props.navigation.navigate('Login')}
      />
          
    </DrawerContentScrollView>
  );
}
//////////////////////////////////////////////
function CustomDrawerContentUserManual(props) {
  // const [subsectionclicked, setSubsectionClicked] = useState('');
  const [pfsubsection, changepfsubsectionstate] = useState(false)
  const yearsContext = useContext(YearsOfServiceContext);
  
  
  return (
    <DrawerContentScrollView { ...props }>
      <DrawerItemList  { ...props} />
      <DrawerItem
        label="Home"
        // icon={({ color, size }) => <Ionicons name="arrow-back" size={size} color={color} />}
        onPress={() => props.navigation.navigate('Homescreen')}
      />
          
    </DrawerContentScrollView>
  );
}




///////////////////////////////////////////////////////////
function DrawerNavs({ route })
{
  function toggleSubsectionsV()
  {
      changepfsubsectionstate(prevState => !prevState)
  }

  return (
    <Drawer.Navigator drawerContent={CustomDrawerContent1} >
            <Drawer.Screen 
              key="Accountsummary"
              name="Accountsummary" 
              component={AccountSummary}
              options = {{
                title:'Account Summary',
                drawerLabel: "Account Summary",
                headerTitleAlign: 'center',
                // initialParams: {
                //   subsectionclicked: route.params.subsectionclicked,
                //   setSubsectionClicked: route.params.setSubsectionClicked
                // } 
              }}
              /> 
              <Drawer.Screen 
              key="Viewprofile"
              name="Viewprofile"  
              component={MyTabs}
              options = {{
                title:'View Profile',
                drawerLabel: "View Profile",
                headerTitleAlign: 'center',
                // initialParams: {
                //     subsectionclicked: route.params.subsectionclicked,
                //     setSubsectionClicked: route.params.setSubsectionClicked
                // } 
              }}
              />
              <Drawer.Screen 
              key="Changepassword"
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
              key="PFyearwisedetails"
              name="PFyearwisedetails" 
              component={PFyearwisedetails}
              options = {{
                // title: yearsContext.pfDisplayyear,
                headerTitleAlign: 'center',
                drawerLabel: () => null
              }}
              />
      </Drawer.Navigator>
  )
}
/////////////////////////////////////////////////////////////////////////////////
function Usermanualdrawer()
{
  return (
    <Drawer.Navigator  drawerContent={CustomDrawerContentUserManual}>
            <Drawer.Screen 
              key="Overview"
              name="Overview" 
              component={Overview}
              options = {{
                title:'Overview',
                drawerLabel: "Overview",
                headerTitleAlign: 'center',
              }}
              />  
              <Drawer.Screen 
              key="Gettingstarted"
              name="Gettingstarted" 
              component={Gettingstarted}
              options = {{
                title:'Getting Started',
                drawerLabel: "Getting Started",
                headerTitleAlign: 'center',
              }}
              />  
              <Drawer.Screen 
              key="Memberdashboard"
              name="Memberdashboard" 
              component={Memberdashboard}
              options = {{
                title:'Member Dashboard',
                drawerLabel: "Member Dashboard",
                headerTitleAlign: 'center',
              }}
              />  
              <Drawer.Screen 
              key="Appendix"
              name="Appendix" 
              component={Appendix}
              options = {{
                title:'Appendix',
                drawerLabel: "Appendix",
                headerTitleAlign: 'center',
              }}
              />  
      </Drawer.Navigator>
  )
}

/////////////////////////////////////////////////////////////////////////////////////
const yearsContext = useContext(YearsOfServiceContext);
return (
  <GestureHandlerRootView>
  <YearsContextProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Homescreen" headerMode="none">
      <Stack.Screen name="Homescreen"
            key="Homescreen"
            component={Homescreen}
            options = {{
              title:'Home',
              headerTitleAlign: 'center'  
            }}
      />
      <Stack.Screen name="Login"
            key="Login"
            component={Login}
            options = {{
              title:'Member Login',
              headerTitleAlign: 'center'
            }}
      />
      <Stack.Screen name="ForgotPassword"
            key="Forgotpassword"
            component={ForgotPassword}
            options = {{
              title:'Forgot Password',
              headerTitleAlign: 'center'
            }}
      />
      <Stack.Screen name="Otp"
            key="Otpscreen"
            component={Otpscreen}
            options = {{
              title:'Login OTP',
              headerTitleAlign: 'center'
            }}
      />
      <Stack.Screen name="EnrolmentOtp"
            key="Enrolmentotpscreen"
            component={Enrolmentotpscreen}
            options = {{
              title:'Enrolment OTP',
              headerTitleAlign: 'center'
            }}
      />
      <Stack.Screen 
        name="DrawerNavigator" 
        
        component={DrawerNavs}  
        options={{
          headerShown: false,
          // initialParams: {
          //   subsectionclicked: subsectionclicked, 
          //   setSubsectionClicked: setSubsectionClicked
          // }
        }}
      />
      <Stack.Screen 
        name="Memberenrolment" 
        key="Memberenrolment"
        component={Memberenrolment}  
        options={{
          title:'Member Enrolment',
          headerTitleAlign: 'center',
          headerShown: true,
        }}
      />
      <Stack.Screen 
        name="Usermanualdrawer" 
        key="Usermanual"
        component={Usermanualdrawer}  
        options={
          
          ({ navigation }) => ({
            headerShown: false,
          header: () => <Usermanualheaderarrow navigation={navigation} />
          })}
      />
       <Stack.Screen 
        name="Grievance" 
        key="Grievance"
        component={Grievance}  
        options={{
          title:'Grievance',
          headerTitleAlign: 'center',
          headerShown: true,
        }
          
          }
      />
       <Stack.Screen 
        name="Ccarescam" 
        key="Ccarescam"
        component={Ccarescamscreen}  
        options={{
          title:'Ccarescam',
          headerTitleAlign: 'center',
          
      }}
      />
      <Stack.Screen 
        name="Ccaresgpt" 
        key="Ccaresgpt"
        component={Ccaresgptscreen}  
        options={{
          title:'',
          title:'Ccares-Assist',
          headerTitleAlign: 'center',
          // ({ navigation }) => ({
            // headerShown: false,
          // header: () => <Usermanualheaderarrow navigation={navigation} />
          // }
        // )
      }}
      />
      <Stack.Screen 
        name="Koylamitra" 
        key="Koylamitra"
        component={Koylamitrascreen}  
        options={{
          title:'',
          title:'Koyla Mitra',
          headerTitleAlign: 'center',
          // ({ navigation }) => ({
            // headerShown: false,
          // header: () => <Usermanualheaderarrow navigation={navigation} />
          // }
        // )
      }}
      />
      </Stack.Navigator>  
    </NavigationContainer>
    </YearsContextProvider>
    </GestureHandlerRootView>
  )
}



