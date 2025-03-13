import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useRef, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import { chatHistoryContext } from "../store/context/chatHistory";
const PlainTextView = ({ message, time, entity }) => {
  const { isDarkModeOn } = useContext(chatHistoryContext);
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
          <FontAwesome5
            name="robot"
            size={24}
            color={isDarkModeOn ? "white" : "black"}
          />
          <Text
            style={{ marginLeft: 5, color: isDarkModeOn ? "white" : "black" }}
          >
            {time}
          </Text>
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
          <Text style={{ color: isDarkModeOn ? "white" : "black" }}>
            {time}
          </Text>
          <MaterialCommunityIcons
            name="human"
            size={24}
            color={isDarkModeOn ? "white" : "black"}
            style={{ marginLeft: 5 }}
          />
        </View>
      ) : null}
      <Text
        style={[
          styles.messageText,
          isDarkModeOn ? styles.lightText : styles.darkText,
        ]}
      >
        {message}
      </Text>
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
  lightText: {
    color: "white",
  },
  darkText: {
    color: "black",
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
  bgLight: {
    backgroundColor: "#f5f5f5",
  },

  itemContainer: {
    marginBottom: 10,
  },
});
