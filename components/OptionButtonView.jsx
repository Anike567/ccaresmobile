import { Text, View, StyleSheet, Pressable, Alert } from "react-native";
import { useContext } from "react";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

import { chatHistoryContext } from "../store/context/chatHistory";

import {
  pfYearList,
  pensionYearList,
  grievanceList,
  mainMenuOption,
  pfAdvanceDetailsList,
  trackClaimList,
} from "./../store/context/chatHistory";

const OptionButtonView = ({
  time,
  message,
  disabled,
  selected,
  index,
  handler,
  entity,
}) => {
  // destructuring all the context from chatHistory context provider
  const { chatHistory, setChatHistory, isDarkModeOn } =
    useContext(chatHistoryContext);

  const getDoubleDigits = (value) =>
    value.toString().length === 1 ? `0${value}` : value;

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
    // this will get the recent time
    const now = new Date();
    const displayData = `${getDoubleDigits(now.getDate())}/${getDoubleDigits(
      now.getMonth() + 1
    )}/${now.getFullYear()} ${getDoubleDigits(
      now.getHours()
    )}:${getDoubleDigits(now.getMinutes())}`;

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
            return {
              ...item,
              time: displayData,
              message: `${interval1}-${interval2}`,
            };
          } else {
            return {
              ...item,
              time: displayData,
            };
          }
          return item; // Keep other messages unchanged
        });
        // const selectedOption = {
        //   time: displayData,
        //   type: "selectedoption",
        //   message: chatHistory[targetIndex].message,
        //   handler: "getPFDetailsForInterval",
        //   entity: "human",
        //   disabled: false,
        //   selected: false,
        // };
        // newList.splice(0, 0, selectedOption);
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
              time: displayData,
              message: `${pensionInterval1}-${pensionInterval2}`,
            };
          } else {
            return {
              ...item,
              time: displayData,
            };
          }
        });

        setChatHistory((prevHistory) => [...prevHistory, ...newPensionList]);

        break;

      case "PFAdvanceDetails":
        disableFunctionality();
        let newPfAdvanceList = [
          {
            time: displayData,
            type: "no_more",
            message: "No More",
            handler: "agent",
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
        break;

      case "Grievance Details":
        disableFunctionality();
        let newPfGrievanceList = [
          {
            time: displayData,
            type: "no_more",
            message: "No More",
            handler: null,
            entity: "agent",
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

        setChatHistory((prevHistory) => [
          ...prevHistory,
          ...newPfGrievanceList,
        ]);

        break;

      default:
        break;
    }
  };

  // handle click event on PF Details button
  const pfHandler = () => {
    // this will update the current time

    const now = new Date();
    const displayData = `${getDoubleDigits(now.getDate())}/${getDoubleDigits(
      now.getMonth() + 1
    )}/${now.getFullYear()} ${getDoubleDigits(
      now.getHours()
    )}:${getDoubleDigits(now.getMinutes())}`;

    //disable all the previous buttons before adding new ones
    disableFunctionality();

    // update the time of the pfYearList to display current time

    for (let i = 0; i < pfYearList.length; i++) {
      pfYearList[i].time = displayData;
    }
    setChatHistory((prevHistory) => [...prevHistory, ...pfYearList]);
  };

  // handle click event on Pension Details button
  const pensionHandler = () => {
    const now = new Date();
    const displayData = `${getDoubleDigits(now.getDate())}/${getDoubleDigits(
      now.getMonth() + 1
    )}/${now.getFullYear()} ${getDoubleDigits(
      now.getHours()
    )}:${getDoubleDigits(now.getMinutes())}`;

    //disable all the previous buttons before adding new ones
    disableFunctionality();

    // update the time of the pfYearList to display current time

    for (let i = 0; i < pensionYearList.length; i++) {
      pensionYearList[i].time = displayData;
    }
    //disable all the previous buttons before adding new ones
    disableFunctionality();
    setChatHistory((prevHistory) => [...prevHistory, ...pensionYearList]);
  };

  // handle click event on PF Advance Details Option

  const pfAdvanceDetailsHandler = () => {
    //get current time
    const now = new Date();
    const displayData = `${getDoubleDigits(now.getDate())}/${getDoubleDigits(
      now.getMonth() + 1
    )}/${now.getFullYear()} ${getDoubleDigits(
      now.getHours()
    )}:${getDoubleDigits(now.getMinutes())}`;

    // update the time of list

    for (let i = 0; i < pfAdvanceDetailsList.length; i++) {
      pfAdvanceDetailsList[i].time = displayData;
    }
    //disable all the previous buttons before adding new ones
    disableFunctionality();
    setChatHistory((prevHistory) => [...prevHistory, ...pfAdvanceDetailsList]);
  };

  // handle click event on Grievance Details  option

  const grievanceDetailsHandler = () => {
    // get the current date

    const now = new Date();
    const displayData = `${getDoubleDigits(now.getDate())}/${getDoubleDigits(
      now.getMonth() + 1
    )}/${now.getFullYear()} ${getDoubleDigits(
      now.getHours()
    )}:${getDoubleDigits(now.getMinutes())}`;

    // update the time of the list

    for (let i = 0; i < grievanceList.length; i++) {
      grievanceList[i].time = displayData;
    }
    disableFunctionality();
    setChatHistory((prevHistory) => [...prevHistory, ...grievanceList]);
  };

  // handles click event on Track Claim option
  const trackClaimHandler = () => {
    // get the current time

    const now = new Date();
    const displayData = `${getDoubleDigits(now.getDate())}/${getDoubleDigits(
      now.getMonth() + 1
    )}/${now.getFullYear()} ${getDoubleDigits(
      now.getHours()
    )}:${getDoubleDigits(now.getMinutes())}`;

    disableFunctionality();

    for (let i = 0; i < trackClaimList.length; i++) {
      trackClaimList[i].time = displayData;
    }

    setChatHistory((prevHistory) => [...prevHistory, ...trackClaimList]);
  };

  // handles the click event on Main Menu
  const mainMenuHandler = () => {
    // get the current time and date to display it
    const now = new Date();
    const displayData = `${getDoubleDigits(now.getDate())}/${getDoubleDigits(
      now.getMonth() + 1
    )}/${now.getFullYear()} ${getDoubleDigits(
      now.getHours()
    )}:${getDoubleDigits(now.getMinutes())}`;
    console.log(displayData);
    //disable all the previous buttons
    disableFunctionality();
    for (let i = 0; i < mainMenuOption.length; i++) {
      mainMenuOption[i].time = displayData;
    }
    //add main menus to previous history
    setChatHistory((prevHistory) => [...prevHistory, ...mainMenuOption]);
  };

  const getDetails = (index) => {
    const getDoubleDigits = (value) =>
      value.length === 1 ? `0${value}` : value;
    const now = new Date();
    const displayData = `${getDoubleDigits(
      now.getDate().toString()
    )}/${getDoubleDigits(
      (now.getMonth() + 1).toString()
    )}/${now.getFullYear()} ${getDoubleDigits(
      now.getHours().toString()
    )}:${getDoubleDigits(now.getMinutes().toString())}`;
    disableFunctionality();

    var [interval1, interval2] = chatHistory[index].message
      .split("-")
      .map(Number);
    let newList = [
      {
        time: displayData,
        type: "selectedoption",
        message: chatHistory[index].message,
        handler: "getPFDetailsForInterval",
        entity: "human",
        disabled: false,
        selected: false,
      },
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
    <View style={styles.container}>
      {entity === "agent" ? (
        <View style={styles.dateTime}>
          <FontAwesome5
            name="robot"
            size={30}
            color={isDarkModeOn ? "white" : "black"}
            style={[styles.icon]}
          />

          <Text style={{ color: isDarkModeOn ? "white" : "black" }}>
            {time}
          </Text>
        </View>
      ) : entity === "human" ? (
        <View style={styles.dateTime}>
          <Text
            style={{ marginLeft: 10, color: isDarkModeOn ? "white" : "black" }}
          >
            {new Date().toLocaleString()}
          </Text>

          <MaterialCommunityIcons
            name="human"
            size={30}
            color={isDarkModeOn ? "white" : "black"}
            style={styles.icon}
          />
        </View>
      ) : null}
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
    </View>
  );
};

export default OptionButtonView;

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
  dateTime: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
