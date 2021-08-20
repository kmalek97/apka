import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";

import { signInUser } from "../../redux/actions";

import Login from "./Login.screen";

export const mapStateProps = (state: {
  userState: any;
  loaderState: { isLoading: any };
}) => ({
  userState: state.userState,
  isLoading: state.loaderState.isLoading,
});

export const mapDispatchProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ signInUser }, dispatch);

export default connect(mapStateProps, mapDispatchProps)(Login);
