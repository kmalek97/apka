import { TextStyle, ViewStyle } from "react-native";

export interface IUserAccountStyles {
  dataContainer: ViewStyle;
  imageLabel: TextStyle;
}

export interface IUserAccountProps {
  userState: {
    userEmail: string;
    userId: string;
    userRole: string;
    userName: string;
    userAvatar: string;
  };
}
