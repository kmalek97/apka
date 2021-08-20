import {connect} from 'react-redux';

import AplicationNavigation from './AplicationNavigation';
import {IAplicationState, IStateProps} from './AplicationNavigation.types';

const mapStateToProps = (state: IStateProps): IAplicationState => ({
  userId: state.userState.userId,
});

export default connect(mapStateToProps)(AplicationNavigation);
