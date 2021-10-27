import { RouteProp } from "@react-navigation/native";
import { ImageStyle, ViewStyle } from "react-native";
import { RootStackParamList } from "../../components/AplicationNavigation/AplicationNavigation.types";

export type IFileScreenProps = RouteProp<RootStackParamList, "FileScreen">;

export interface IFileScreenStyles {
  screenScrollContainer: ViewStyle;
  screenContainer: ViewStyle;
  cover: ImageStyle;
  coverContainer: ViewStyle;
  iconAndTimeContainer: ViewStyle;
}
