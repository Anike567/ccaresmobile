import { Text, View, StyleSheet, Pressable, Alert } from "react-native";
import { useContext } from "react";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { ChatHistoryContext } from "../store/context/chatHistory";

const OptionButtonView = ({
  message,
  disabled,
  selected,
  index,
  handler,
  entity,
}) => {
  // destructuring all the context from chatHistory context provider

  const {
    chatHistory,
    setChatHistory,
    pfYearList,
    setPfYearList,
    pensionYearList,
    setPensionYearList,
    grievanceList,
    setGrievanceList,
    mainMenuOption,
    pfAdvanceDetailsList,
    setPfAdvanceDetailsList,
  } = useContext(ChatHistoryContext);

  const getDoubleDigits = (value) =>
    value.toString().length === 1 ? `0${value}` : value;

  const now = new Date();
  const displayData = `${getDoubleDigits(now.getDate())}/${getDoubleDigits(
    now.getMonth() + 1
  )}/${now.getFullYear()} ${getDoubleDigits(now.getHours())}:${getDoubleDigits(
    now.getMinutes()
  )}`;

  //this function disable the all previous option buttons by setting the disabled property true
  const disableFunctionality = () => {
    setChatHistory((prevHistory) =>
      prevHistory.map((item) =>
        item.type === "option" ? { ...item, disabled: true } : item
      )
    );
  };

  // this function handle the click event on More option on the basis of 'for' property
  const moreHandler = (targetIndex) => {
    //disable all the previous buttons before adding new ones
    disableFunctionality();

    switch (chatHistory[targetIndex]?.for) {
      case "PFDetails":
        disableFunctionality();

        if (pfYearList.length === 0) {
          return;
        }

        var lastIndex = pfYearList.length - 3; // Get the last index of valid year ranges
        var [interval1, interval2] = pfYearList[lastIndex].message
          .split("-")
          .map(Number);

        var newList = pfYearList.map((item) => {
          if (!["More", "Main Menu", "PF Details"].includes(item.message)) {
            interval1 = interval2 + 10; // Move to the next decade range correctly
            interval2 = interval2 + 20;
            return { ...item, message: `${interval1}-${interval2}` };
          }
          return item; // Keep other messages unchanged
        });

        //update the new pfYearList against of old list
        setPfYearList(newList);

        // ad new pflist to previous list
        setChatHistory((prevHistory) => [...prevHistory, ...newList]);

        break;

      case "PensionDetails":
        //disable all the previous buttons before adding new ones
        disableFunctionality();

        if (pensionYearList.length === 0) {
          return;
        }

        var pensionLastIndex = pensionYearList.length - 3; // Get the last index of valid year ranges
        var [pensionInterval1, pensionInterval2] = pensionYearList[
          pensionLastIndex
        ].message
          .split("-")
          .map(Number);

        const newPensionList = pensionYearList.map((item) => {
          if (!["More", "Main Menu", "PF Details"].includes(item.message)) {
            // Variable names mismatch fix - using pensionInterval1 and pensionInterval2
            pensionInterval1 = pensionInterval2 + 10; // Move to the next decade range correctly
            pensionInterval2 = pensionInterval2 + 20;
            return {
              ...item,
              message: `${pensionInterval1}-${pensionInterval2}`,
            };
          }
          return item; // Keep other messages unchanged
        });

        setChatHistory((prevHistory) => [...prevHistory, ...newPensionList]);
        setPensionYearList(newPensionList);

        break;

      case "PFAdvanceDetails":
        disableFunctionality();
        let newPfAdvanceList = [
          {
            time: displayData,
            type: "option",
            message: "No More",
            handler: "moreHandler",
            entity: null,
            disabled: true,
            selected: false,
            for: "PFAdvanceDetails",
          },
          {
            time: displayData,
            type: "option",
            message: "Main Menu",
            handler: "mainMenuHandler",
            entity: null,
            disabled: false,
            selected: false,
          },
        ];

        setChatHistory((prevHistory) => [...prevHistory, ...newPfAdvanceList]);
      default:
        break;
    }
  };

  // handle click event on PF Details button
  const pfHandler = () => {
    //disable all the previous buttons before adding new ones
    disableFunctionality();
    setChatHistory((prevHistory) => [...prevHistory, ...pfYearList]);
  };

  // handle click event on Pension Details button
  const pensionHandler = () => {
    //disable all the previous buttons before adding new ones
    disableFunctionality();
    setChatHistory((prevHistory) => [...prevHistory, ...pensionYearList]);
  };

  // handle click event on PF Advance Details Option

  const pfAdvanceDetailsHandler = () => {
    //disable all the previous buttons before adding new ones
    disableFunctionality();
    setChatHistory((prevHistory) => [...prevHistory, ...pfAdvanceDetailsList]);
  };

  // handle click event on Grievance Details  option

  const grievanceDetailsHandler = () => {
    disableFunctionality();
    setChatHistory((prevHistory) => [...prevHistory, ...grievanceList]);
  };

  // handles click event on Track Claim option
  const trackClaimHandler = () => {
    disableFunctionality();
    let newList = [
      {
        time: displayData,
        type: "option",
        message: "Main Menu",
        handler: "mainMenuHandler",
        entity: null,
        disabled: false,
        selected: false,
      },
    ];
    setChatHistory((prevHistory) => [...prevHistory, ...newList]);
    Alert.alert("track claim pressed");
  };
  // handles the click event on Main Menu
  const mainMenuHandler = () => {
    //disable all the previous buttons
    disableFunctionality();
    //add main menus to previous history
    setChatHistory((prevHistory) => [...prevHistory, ...mainMenuOption]);
  };

  const getDetails = (index) => {
    disableFunctionality();

    var [interval1, interval2] = chatHistory[index].message
      .split("-")
      .map(Number);
    let newList = [
      {
        time: displayData,
        type: "plaintext",
        message: `Year:${interval1},\nOpening Balance :2000 .\n Closing Balance : 4000 .\n Voluntary Contribution : 1000 .\n Member Contribution : 5000 .\n Employer Contribution : 5000 .\n Interest : 5% .\n TDS : `,
        entity: "agent",
        disabled: false,
      },
      {
        time: displayData,
        type: "option",
        message: "Main Menu",
        handler: "mainMenuHandler",
        entity: null,
        disabled: false,
        selected: false,
      },
    ];
    setChatHistory((prevHistory) => [...prevHistory, ...newList]);
  };

  // this is mapper used to map string value to its corresponding functions
  const eventHandlerMapper = {
    pfHandler: pfHandler,
    pensionHandler: pensionHandler,
    pfAdvanceDetailsHandler: pfAdvanceDetailsHandler,
    grievanceDetailsHandler: grievanceDetailsHandler,
    trackClaimHandler: trackClaimHandler,
    mainMenuHandler: mainMenuHandler,
    moreHandler: moreHandler,
    getPFDetailsForInterval: getDetails,
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: entity === "agent" ? "flex-start" : "flex-end",
      }}
    >
      {entity === "agent" && (
        <FontAwesome5
          color="black"
          size={20}
          name="robot"
          style={{ marginRight: 8 }}
        />
      )}

      <Pressable
        onPress={() => {
          if (!disabled) {
            setChatHistory((prevHistory) =>
              prevHistory.map((item, i) =>
                i === index ? { ...item, selected: true } : item
              )
            );

            if (eventHandlerMapper[handler]) {
              eventHandlerMapper[handler](index);
            }
          }
        }}
        style={[
          styles.optionButton,
          selected ? styles.bgColorBlack : styles.buttonBgColor,
          disabled && styles.disabledButton,
        ]}
        disabled={disabled}
      >
        <Text style={{ color: disabled ? "#6D28D9" : "white" }}>{message}</Text>
      </Pressable>

      {entity === "human" && (
        <MaterialCommunityIcons
          name="human"
          size={40}
          color="black"
          style={{ marginLeft: 8 }}
        />
      )}
    </View>
  );
};

export default OptionButtonView;

const styles = StyleSheet.create({
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
