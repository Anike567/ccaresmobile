import { View, ViewStyle, Text } from "react-native";
// import { styles } from "./styles";
import { ReactNode } from "react";


function Row(props){
   return (
    <View>
      {props.children}
    </View>
  )
};


export default Row;