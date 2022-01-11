import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";

import { paymentStatus } from "../../redux/actions";

import UserAccount from "./UserAccount.screen";

export const mapStateProps = (state: { userState: any }) => ({
  userState: state.userState,
});

export const mapDispatchProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ paymentStatus }, dispatch);

export default connect(mapStateProps, mapDispatchProps)(UserAccount);
