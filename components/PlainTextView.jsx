import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
} from "react-native";

const PlainTextView = ({ message, time, entity }) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginVertical: 5,
      }}
    >
      {entity === "agent" ? (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome5 name="robot" size={24} color="black" />
          <Text style={{ marginLeft: 5 }}>{time}</Text>
        </View>
      ) : null}
      {entity === "human" ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: 10,
            borderColor: "black",
          }}
        >
          <Text>{time}</Text>
          <MaterialCommunityIcons
            name="human"
            size={24}
            color="black"
            style={{ marginLeft: 5 }}
          />
        </View>
      ) : null}
      <Text style={styles.messageText}>{message}</Text>
    </View>
  );
};

export default PlainTextView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  itemContainer: {
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
    marginVertical: 5,
  },
  optionButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 3,
    width: 300,
    height: 50,
  },
  disabledButton: {
    backgroundColor: "#d3d3d3",
    opacity: 0.7,
  },
  bgColorBlack: {
    backgroundColor: "black",
  },
  buttonBgColor: {
    backgroundColor: "rgb(56, 189, 230)",
  },
});
