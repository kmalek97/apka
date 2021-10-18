import { connect } from "react-redux";

import AddEbookForm from "./AddEbookForm.screen";

export const mapStateProps = (state: {
  loaderState: { isLoading: any };
  categories: [];
}) => ({
  isLoading: state.loaderState.isLoading,
  categories: state.categories,
});

export default connect(mapStateProps)(AddEbookForm);
