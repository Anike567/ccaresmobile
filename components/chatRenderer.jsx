import { View, ScrollView, StyleSheet, Pressable, TextInput, Text} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// 9d0b
const Chatrenderer = (props) => {
    return (
        props.role == 'model' ?
        <View style={styles.box}>
            <FontAwesome5 name="robot" size={24} color="black" />
            <Text>{props.time}</Text>
        </View>:
        <View style={styles.box}>
            <Text>{props.time}</Text>
            <MaterialCommunityIcons name="human" size={24} color="black" />    
        </View>
    )
};

const styles = StyleSheet.create({
    boxUser:{
        backgroundColor: '#808080',
        width:'100%',
        // height:'30%',
        padding:5,
        borderRadius:2
    },
    boxModel:{
        backgroundColor: '#CBC3E3',
        width:'100%',
        // height:'30%',
        padding:5,
        borderRadius:2
    },
    box: {
        flexDirection:'row',
        justifyContent: 'flex-start',
        marginBottom:3,
        
    },
});

export default Chatrenderer;