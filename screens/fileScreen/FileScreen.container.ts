import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { updateUser } from "../../redux/actions";

import FileScreen from "./FileScreen";

const mapStateToProps = (state: { userState: any }) => ({
  userState: state.userState,
});

export const mapDispatchProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ updateUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(FileScreen);
