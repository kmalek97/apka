import { StyleSheet } from "react-native";
import { IFileScreenStyles } from "./FileScreen.types";

export const styles = (theme: ReactNativePaper.Theme) =>
  StyleSheet.create<IFileScreenStyles>({
    screenScrollContainer: {
      minHeight: "100%",
    },
    screenContainer: {
      paddingTop: 35,
      paddingLeft: 30,
      paddingRight: 30,
      alignItems: "center",

      flexBasis: "100%",
      flexGrow: 1,
      flexDirection: "column",
      width: "100%",
    },
    cover: {
      height: 250,
      width: 250,
    },
    coverContainer: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
    iconAndTimeContainer: {
      alignItems: "center",
      paddingTop: 10,
      paddingBottom: 10,
    },
    typeContainer: {
      flexDirection: "column",
      alignItems: "center",
      paddingTop: 15,
    },
    paragraphStyle: {},
    buttonStyle: {
      borderRadius: 90,
      backgroundColor: theme.colors.primary,
      marginTop: 10,
    },
    buttonText: {
      color: "#FFF",
      fontSize: 20,
      padding: 6,
    },
    categoriesContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      flexWrap: "wrap",
    },
  });
