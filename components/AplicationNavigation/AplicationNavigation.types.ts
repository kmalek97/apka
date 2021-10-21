import { IItemsData } from "../EbookOrAudiobooks/content/FilePreview.types";

export interface IStateProps {
  userState: {
    userToken: string;
    userId: string;
  };
}
export interface IAplicationState {
  userId: string;
}

export type RootStackParamList = {
  Home: undefined;
  Main: undefined;
  UserAccount: undefined;
  AddEbookForm: undefined;
  AddAudiobookForm: undefined;
  FileScreen: { dataItem: IItemsData };
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
};

export type IAplicationNavigationProps = IAplicationState;
