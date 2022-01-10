import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from "redux";

import { paymentStatus } from "../../redux/actions";

import Home from './Home.screen';
import { IAplicationState, IStateProps } from './Home.types';

export const mapStateToProps = (state: IStateProps): IAplicationState => ({
  userToken: state.userState.userToken,
});

export const mapDispatchProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ paymentStatus }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Home);

