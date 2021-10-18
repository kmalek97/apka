import { TextStyle, ViewStyle } from "react-native";

export interface IAddEbookProps {
  isLoading: boolean;
  categories: ICategory[];
}

export interface ICategory {
  id: number;
  name: string;
}

export interface IAddEbookFormStyles {
  categoryContainer: ViewStyle;
  categoryItem: ViewStyle;
  formContainer: ViewStyle;
  wrapper: ViewStyle;
  errorBottomText: TextStyle;
  errorBottomTextWrapper: ViewStyle;
  input: ViewStyle;
  button: ViewStyle;
  buttonText: ViewStyle;
  dateButton: ViewStyle;
  dateInput: ViewStyle;
}
