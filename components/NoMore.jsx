import { StyleSheet, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const NoMore = ({
  time,
  message,
  disabled,
  selected,
  index,
  handler,
  entity,
}) => {
  return (
    <View style={styles.container}>
      {entity === "agent" ? (
        <View style={styles.dateText}>
          <FontAwesome5
            name="robot"
            size={30}
            color="black"
            style={[styles.icon]}
          />
          <Text>{time}</Text>
        </View>
      ) : entity === "human" ? (
        <MaterialCommunityIcons
          name="human"
          size={30}
          color="black"
          style={styles.icon}
        />
      ) : null}
      <View style={styles.noMoreButton}>
        <Text>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column", // Stack elements vertically
    // alignItems: "flex-end", // Center horizontally
    justifyContent: "center",

    width: "100%", // Ensure it doesn't shrink
  },
  icon: {
    marginBottom: 10, // Space between icon and button
  },
  noMoreButton: {
    padding: 10,
    borderRadius: 10,
    opacity: 0.8,
    alignItems: "center",
    backgroundColor: "red",
    justifyContent: "center",
    marginVertical: 3,
    width: 300,
    height: 50,
  },
  dateText: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 14,
    color: "black",
    gap: 10,
  },
});
