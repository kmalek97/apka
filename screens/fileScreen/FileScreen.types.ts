import { RouteProp } from "@react-navigation/native";
import { ImageStyle, TextStyle, ViewStyle } from "react-native";
import { RootStackParamList } from "../../components/AplicationNavigation/AplicationNavigation.types";

export type IFileScreenProps = RouteProp<RootStackParamList, "FileScreen">;

export interface IFileScreenStyles {
  screenScrollContainer: ViewStyle;
  screenContainer: ViewStyle;
  cover: ImageStyle;
  coverContainer: ViewStyle;
  iconAndTimeContainer: ViewStyle;
  typeContainer: ViewStyle;
  paragraphStyle: ViewStyle;
  buttonStyle: ViewStyle;
  buttonText: TextStyle;
  categoriesContainer: ViewStyle;
}
