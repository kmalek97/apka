import { TextStyle, ViewStyle } from "react-native";

export interface IAddAudiobookProps {
  isLoading: boolean;
  categories: ICategory[];
}

export interface ICategory {
  id: number;
  name: string;
}

export interface IAddAudiobookFormStyles {
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
  timeContainer: ViewStyle;
  timeInput: ViewStyle;
}
