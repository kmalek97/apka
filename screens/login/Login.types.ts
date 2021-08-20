import { TextStyle, ViewStyle } from "react-native";

export interface ILoginStyles {
  formContainer: ViewStyle;
  wrapper: ViewStyle;
  errorBottomText: TextStyle;
  errorBottomTextWrapper: ViewStyle;
  input: ViewStyle;
  button: ViewStyle;
  buttonText: ViewStyle;
}

export interface ILoginProps {
  signInUser: any;
  route: any;
  isLoading: boolean;
}
