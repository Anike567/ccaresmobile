import { useRef, useEffect, useContext } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import PlainTextView from "../components/PlainTextView";
import OptionButtonView from "../components/OptionButtonView";
import SelectedOption from "../components/SelectedOption";
import { NoMore } from "../components/NoMore";
import { chatHistoryContext } from "../store/context/chatHistory";

export default function KoylaMitraNew() {
  const flatlistRef = useRef(null);
  const { chatHistory } = useContext(chatHistoryContext); // Fixed context reference

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
                time={item.time}
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
                time={item.time}
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
                time={item.time}
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
