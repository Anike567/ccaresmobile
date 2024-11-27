import { View, Text, StyleSheet } from "react-native";


function Accountsummarycard(props)
{
    return (
        <View style={styles.card}>
            <Text  key={props.keyc} style={styles.footer}>{props.v}</Text>
        </View>
        
    )
}


const styles = StyleSheet.create({
    card:{
        flex:1,
        width:'100%',
        paddingVertical:5,
        borderWidth:1,
        paddingHorizontal:30,
        borderBottomLeftRadius:0,
        borderBottomRightRadius: 1,
        marginBottom:10,
        borderTopColor: '#6D28D9'
    },
    header:{
        fontWeight:'bold'
    },
    footer:{
        // marginTop: -15,
        padding:5
    }
})

export default Accountsummarycard;
