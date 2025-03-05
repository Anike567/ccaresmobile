import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

export default function SelectedOption({
  message,
  disabled,
  selected,
  entity,
}) {
  return (
    <View style={styles.container}>
      {/* Ensure only one icon is rendered above the button */}

      <MaterialCommunityIcons
        name="human"
        size={30}
        color="black"
        style={styles.icon}
      />
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
    flexDirection: "column", // Stack elements vertically
    alignItems: "flex-end", // Center horizontally
    justifyContent: "center",
    width: "100%", // Ensure it doesn't shrink
  },
  icon: {
    marginBottom: 10, // Space between icon and button
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
});
