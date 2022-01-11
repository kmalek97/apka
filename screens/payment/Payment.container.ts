import { connect } from "react-redux";

import Payment from "./Payment.screen";

export const mapStateProps = (state: { userState: any }) => ({
  userState: state.userState,
});

export default connect(mapStateProps)(Payment);
