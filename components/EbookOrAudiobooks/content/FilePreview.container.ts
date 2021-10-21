import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";

import { getFile } from "../../../redux/actions";

import FilePreview from "./FilePreview";

export const mapStateProps = (state: {
  userState: any;
  ebooks: any;
  audiobooks: any;
  loaderState: { isLoading: any };
}) => ({
  ebooks: state.ebooks,
  audiobooks: state.audiobooks,
  userState: state.userState,
  isLoading: state.loaderState.isLoading,
});

export const mapDispatchProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ getFile }, dispatch);

export default connect(mapStateProps, mapDispatchProps)(FilePreview);
