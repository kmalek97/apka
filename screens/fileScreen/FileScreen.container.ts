import { connect } from 'react-redux';

import FileScreen from './FileScreen';

const mapStateToProps = (state: { userState: any }) => ({
  userState: state.userState,
});

export default connect(mapStateToProps)(FileScreen);
