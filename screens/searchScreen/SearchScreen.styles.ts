import { StyleSheet } from "react-native";
import { ISearchScreen } from "./SearchScreen.types";

export const styles = StyleSheet.create<ISearchScreen>({
  wrapper: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#7F8283",
    borderRadius: 15,
    marginHorizontal: 15,
  },
  inputText: {
    fontSize: 15,
    paddingLeft: 7,
  },
  userButton: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  userText: {
    fontSize: 15,
    fontWeight: "700",
  },
});
