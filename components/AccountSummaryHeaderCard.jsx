import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

function Accountsummaryheadercard(props)
{
    return (
        <View style={styles.card}>
            <Text style={styles.header}>{props.heading}</Text> 
        </View>
        
    )
}
 
const styles = StyleSheet.create({
    card:{
        backgroundColor: '#6D28D9',
        flex:1,
        width:'100%',
        borderWidth:1,
        paddingHorizontal:15,
        paddingVertical:5,
        borderTopLeftRadius:3,
        borderTopRightRadius:3,
        elevation:3,
        borderBottomColor: 'rgba(0, 0, 0, 0.5)'
    },
    header:{
        color:'white',
        fontWeight:'bold'
    }
})

export default Accountsummaryheadercard;
