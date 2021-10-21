import { Dimensions, StyleSheet } from "react-native";
import { IHomeStyles } from "./Home.types";

export const styles = StyleSheet.create<IHomeStyles>({
  screenContainer: {
    alignSelf: "center",
    width: "90%",
    marginTop: 20,
    height: Dimensions.get("window").height - 250,
  },
});
