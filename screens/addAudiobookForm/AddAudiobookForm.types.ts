import { RouteProp } from "@react-navigation/native";
import { TextStyle, ViewStyle } from "react-native";
import { RootStackParamList } from "../../components/AplicationNavigation/AplicationNavigation.types";

export interface IAddAudiobookProps {
  isLoading: boolean;
  categories: ICategory[];
}

export interface IItemProps {
  title: string;
  description: string;
  lector?: string;
  numberOfPages?: string;
  author?: string;
  coverURL?: string;
  downloadURL?: string;
  creation: any;
  publishing?: string;
  categories: [
    object: {
      id: number;
      name: string;
    }
  ];
  publicationDate: string;
  time: {
    hour: string;
    minute: string;
  };
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
  coverButtonContainer: ViewStyle;
}

export type IAddAudiobookFormScreenProps = RouteProp<
  RootStackParamList,
  "AddAudiobookForm"
>;
