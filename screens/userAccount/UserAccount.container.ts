import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";

import { signInUser } from "../../redux/actions";
import { paymentStatus } from "../../redux/actions";

import UserAccount from "./UserAccount.screen";

export const mapStateProps = (state: {
  userState: any;
  loaderState: { isLoading: any };
}) => ({
  userState: state.userState,
  isLoading: state.loaderState.isLoading,
});

export const mapDispatchProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ signInUser, paymentStatus }, dispatch);

export default connect(mapStateProps, mapDispatchProps)(UserAccount);
