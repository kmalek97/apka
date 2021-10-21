import { TextStyle, ViewStyle } from "react-native";

export interface IEbookorAudiobooksStyles {
  buttonsContainer: ViewStyle;
  button: ViewStyle;
  buttonOff: ViewStyle;
  buttonText: TextStyle;
}

export type ITypes = "ebook" | "audio";

export interface IIEbookorAudiobooksProps {
  selectedType: ITypes;
}
