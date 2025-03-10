import React from "react";
import { configureFonts, MD3LightTheme as DefaultTheme } from "react-native-paper";
import customFonts from "./Fonts";



const theme = {
  ...DefaultTheme,
//   fonts: configureFonts(customFonts),
//   roundness: 30,
  colors: {
    ...DefaultTheme.colors,
    primary: "#4169E1",
    accent: "#f1c40f",
  },
};

export default theme;
