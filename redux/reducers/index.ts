import { combineReducers } from 'redux';
import { loader } from './loader';
import { user } from './user';

const Reducers = combineReducers({
  userState: user,
  loaderState: loader,
});

export default Reducers;
