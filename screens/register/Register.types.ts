import { TextStyle, ViewStyle } from "react-native";

export interface IRegisterStyles {
  formContainer: ViewStyle;
  wrapper: ViewStyle;
  errorBottomText: TextStyle;
  errorBottomTextWrapper: ViewStyle;
  input: ViewStyle;
  button: ViewStyle;
  buttonText: ViewStyle;
}

export interface IRegisterProps {
  route: any;
  isLoading: boolean;
  registerUser: any;
}
