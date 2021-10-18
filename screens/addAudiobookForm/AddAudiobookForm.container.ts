import { connect } from "react-redux";

import AddAudiobookForm from "./AddAudiobookForm.screen";

export const mapStateProps = (state: {
  loaderState: { isLoading: any };
  categories: [];
}) => ({
  isLoading: state.loaderState.isLoading,
  categories: state.categories,
});

export default connect(mapStateProps)(AddAudiobookForm);
