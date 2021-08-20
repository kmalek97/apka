import {connect} from 'react-redux';

import Home from './Home.screen';
import {IAplicationState, IStateProps} from './Home.types';

const mapStateToProps = (state: IStateProps): IAplicationState => ({
  userToken: state.userState.userToken,
});

export default connect(mapStateToProps)(Home);
