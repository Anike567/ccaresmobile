import { useRef, useEffect, useContext } from "react";
import { View, StyleSheet, FlatList, Pressable, Alert } from "react-native";
import PlainTextView from "../components/PlainTextView";
import OptionButtonView from "../components/OptionButtonView";
import { ChatHistoryContext } from "../store/context/chatHistory";
import SelectedOption from "../components/SelectedOption";
import { NoMore } from "../components/NoMore";

export default function KoylaMitraNew() {
  const flatlistRef = useRef(null);
  const { chatHistory } = useContext(ChatHistoryContext);

  // Scroll to end whenever chatHistory updates
  useEffect(() => {
    if (flatlistRef.current) {
      setTimeout(() => {
        flatlistRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [chatHistory]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatlistRef}
        data={chatHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            {item.type === "plaintext" && (
              <PlainTextView
                message={item.message}
                time={item.time}
                entity={item.entity}
              />
            )}
            {item.type === "option" && (
              <OptionButtonView
                message={item.message}
                disabled={item.disabled}
                selected={item.selected}
                index={index}
                handler={item.handler}
                entity={item.entity}
              />
            )}
            {item.type === "selectedoption" && (
              <SelectedOption
                message={item.message}
                disabled={item.disabled}
                selected={item.selected}
                index={index}
                handler={item.handler}
                entity={item.entity}
              />
            )}
            {item.type === "no_more" && (
              <NoMore
                message={item.message}
                disabled={item.disabled}
                selected={item.selected}
                index={index}
                handler={item.handler}
                entity={item.entity}
              />
            )}
          </View>
        )}
        onContentSizeChange={() =>
          flatlistRef.current?.scrollToEnd({ animated: true })
        }
        onLayout={() => flatlistRef.current?.scrollToEnd({ animated: true })}
      />
    </View>
  );
}

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
});
