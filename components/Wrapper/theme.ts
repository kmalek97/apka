import { DefaultTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    primary: "#E79A36",
    accent: "#fff",
    surface: "#fff",
    myOwnColor: "#fff",
  },
};

export default theme;
