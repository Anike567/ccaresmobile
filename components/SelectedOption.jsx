import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SelectedOption({ message, disabled }) {
  const now = new Date();
  const dateAndTime = now.toLocaleString();

  return (
    <View style={styles.container}>
      <View style={styles.dateText}>
        <Text>{dateAndTime}</Text>
        <MaterialCommunityIcons
          name="human"
          size={30}
          color="black"
          style={styles.icon}
        />
      </View>
      <Pressable
        style={[styles.optionButton, styles.bgColorBlack]}
        disabled={disabled}
      >
        <Text style={styles.buttonText}>{message}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    width: "100%",
  },
  icon: {
    marginBottom: 10,
  },
  optionButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
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
  dateText: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 14,
    color: "black",
  },
});
