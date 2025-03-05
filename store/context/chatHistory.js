import { createContext, useState } from "react";

// Create the context
export const ChatHistoryContext = createContext();

// Create the provider component
export const ChatHistoryProvider = ({ children }) => {
  // these functions return the current date and times

  const getDoubleDigits = (value) => (value.length === 1 ? `0${value}` : value);
  const now = new Date();
  const displayData = `${getDoubleDigits(
    now.getDate().toString()
  )}/${getDoubleDigits(
    (now.getMonth() + 1).toString()
  )}/${now.getFullYear()} ${getDoubleDigits(
    now.getHours().toString()
  )}:${getDoubleDigits(now.getMinutes().toString())}`;

  /* 
       list of data that will rendered in flatlist 
       type  == 'plaintext ' means it is normal text
       type == 'option ' means it is option button 
       selected == true means tha option is selected and displayed in black color

   */
  const [chatHistory, setChatHistory] = useState([
    {
      time: displayData,
      type: "plaintext",
      message: "Hello,\nI am Koyla Mitra.\nHow can I help you?",
      entity: "agent",
      disabled: false,
    },
    {
      time: displayData,
      type: "option",
      message: "PF Details",
      handler: "pfHandler",
      entity: null,
      disabled: false,
      selected: false,
    },
    {
      time: displayData,
      type: "option",
      message: "Pension Details",
      handler: "pensionHandler",
      entity: null,
      disabled: false,
      selected: false,
    },
    {
      time: displayData,
      type: "option",
      message: "PF Advance Details",
      handler: "pfAdvanceDetailsHandler",
      entity: null,
      disabled: false,
      selected: false,
    },
    {
      time: displayData,
      type: "option",
      message: "Grievance Details",
      handler: "grievanceDetailsHandler",
      entity: null,
      disabled: false,
      selected: false,
    },
    {
      time: displayData,
      type: "option",
      message: "Track Claim",
      handler: "trackClaimHandler",
      entity: null,
      disabled: false,
      selected: false,
    },
  ]);

  // this list years interval to display for pfOption
  const [pfYearList, setPfYearList] = useState([
    {
      time: displayData,
      type: "selectedoption",
      message: "PF Details",
      handler: "getPFDetailsForInterval",
      entity: "human",
      disabled: false,
      selected: false,
    },
    {
      time: displayData,
      type: "option",
      message: "1940-1950",
      handler: "getPFDetailsForInterval",
      entity: "agent",
      disabled: false,
      selected: false,
    },
    {
      time: displayData,
      type: "option",
      message: "1960-1970",
      handler: "getPFDetailsForInterval",
      entity: null,
      disabled: false,
      selected: false,
    },
    {
      time: displayData,
      type: "option",
      message: "1970-1980",
      handler: "getPFDetailsForInterval",
      entity: null,
      disabled: false,
      selected: false,
    },
    {
      time: displayData,
      type: "option",
      message: "More",
      handler: "moreHandler",
      entity: null,
      disabled: false,
      selected: false,
      for: "PFDetails",
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
  ]);

  // this list years interval to display for pensionOption
  const [pensionYearList, setPensionYearList] = useState([
    {
      time: displayData,
      type: "selectedoption",
      message: "Pension Details",
      handler: "getPFDetailsForInterval",
      entity: "human",
      disabled: false,
      selected: false,
    },
    {
      time: displayData,
      type: "option",
      message: "1940-1950",
      handler: "getPFDetailsForInterval",
      entity: "agent",
      disabled: false,
      selected: false,
    },
    {
      time: displayData,
      type: "option",
      message: "1960-1970",
      handler: "getPFDetailsForInterval",
      entity: null,
      disabled: false,
      selected: false,
    },
    {
      time: displayData,
      type: "option",
      message: "1970-1980",
      handler: "getPFDetailsForInterval",
      entity: null,
      disabled: false,
      selected: false,
    },
    {
      time: displayData,
      type: "option",
      message: "More",
      handler: "moreHandler",
      entity: null,
      disabled: false,
      selected: false,
      for: "PensionDetails",
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
  ]);

  // this list store the data coming from server for PF Advance Details option
  const [pfAdvanceDetailsList, setPfAdvanceDetailsList] = useState([
    {
      time: displayData,
      type: "selectedoption",
      message: "PF Advance Details",
      handler: "getPFDetailsForInterval",
      entity: "human",
      disabled: false,
      selected: false,
    },
    {
      time: displayData,
      type: "option",
      message: "1969",
      handler: "getPFDetailsForInterval",
      entity: "agent",
      disabled: false,
      selected: false,
    },
    {
      time: displayData,
      type: "option",
      message: "1970",
      handler: "getPFDetailsForInterval",
      entity: null,
      disabled: false,
      selected: false,
    },
    {
      time: displayData,
      type: "option",
      message: "More",
      handler: "moreHandler",
      entity: null,
      disabled: false,
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
  ]);

  // this list will stored gievence details list which will come from backend
  // currentl it is hardcoded data

  const [grievanceList, setGrievanceList] = useState([
    {
      time: displayData,
      type: "selectedoption",
      message: "Grievance Details",
      handler: "getPFDetailsForInterval",
      entity: "human",
      disabled: false,
      selected: false,
    },
    {
      time: displayData,
      type: "option",
      message: "GR10000009",
      handler: "getPFDetailsForInterval",
      entity: "agent",
      disabled: false,
      selected: false,
    },
    {
      time: displayData,
      type: "option",
      message: "GR10000009",
      handler: "getPFDetailsForInterval",
      entity: null,
      disabled: false,
      selected: false,
    },
    {
      time: displayData,
      type: "option",
      message: "GR10000009",
      handler: "getPFDetailsForInterval",
      entity: null,
      disabled: false,
      selected: false,
    },
    {
      time: displayData,
      type: "option",
      message: "More",
      handler: "moreHandler",
      entity: null,
      disabled: false,
      selected: false,
      for: "Grievance Details",
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
  ]);

  const [mainMenuOption, setMainMenuOption] = useState([
    {
      time: displayData,
      type: "selectedoption",
      message: "Main Menu",
      handler: "getPFDetailsForInterval",
      entity: "human",
      disabled: false,
      selected: false,
    },
    {
      time: displayData,
      type: "option",
      message: "PF Details",
      handler: "pfHandler",
      entity: "agent",
      disabled: false,
      selected: false,
    },
    {
      time: displayData,
      type: "option",
      message: "Pension Details",
      handler: "pensionHandler",
      entity: null,
      disabled: false,
      selected: false,
    },
    {
      time: displayData,
      type: "option",
      message: "PF Advance Details",
      handler: "pfAdvanceDetailsHandler",
      entity: null,
      disabled: false,
      selected: false,
    },
    {
      time: displayData,
      type: "option",
      message: "Grievance Details",
      handler: "grievanceDetailsHandler",
      entity: null,
      disabled: false,
      selected: false,
    },
    {
      time: displayData,
      type: "option",
      message: "Track Claim",
      handler: "trackClaimHandler",
      entity: null,
      disabled: false,
      selected: false,
    },
  ]);

  return (
    <ChatHistoryContext.Provider
      value={{
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
      }}
    >
      {children}
    </ChatHistoryContext.Provider>
  );
};
