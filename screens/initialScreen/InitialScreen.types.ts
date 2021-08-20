import { TextStyle, ViewStyle } from "react-native";

export interface IInitialScreen {
  container: ViewStyle;
  button: ViewStyle;
  buttonText: TextStyle;
}

export interface IInitialScreenProps {
  loginPress?: () => void;
  registerPress?: () => void;
}
