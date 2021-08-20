import {ViewStyle} from 'react-native';

export interface IStateProps {
  userState: {
    userToken: string;
    userId: string;
  };
}
export interface IAplicationState {
  userToken: string;
}

export interface IHomeStyles {
  screenContainer: ViewStyle;
}

export type IHomeState = IAplicationState;
