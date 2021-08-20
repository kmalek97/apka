export interface IStateProps {
  userState: {
    userToken: string;
    userId: string;
  };
}
export interface IAplicationState {
  userId: string;
}

export type IAplicationNavigationProps = IAplicationState;
