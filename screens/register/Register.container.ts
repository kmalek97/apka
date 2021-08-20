import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";

import { registerUser } from "../../redux/actions";

import Register from "./Register.screen";

export const mapStateProps = (state: { loaderState: { isLoading: any } }) => ({
  isLoading: state.loaderState.isLoading,
});

export const mapDispatchProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ registerUser }, dispatch);

export default connect(mapStateProps, mapDispatchProps)(Register);
