import { StyleSheet } from "react-native";
import { IUserAccountStyles } from "./UserAccount.types";

export const styles = StyleSheet.create<IUserAccountStyles>({
  dataContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    height: "50%",
    marginTop: "10%",
  },
  imageLabel: {
    fontSize: 60,
  },
});
