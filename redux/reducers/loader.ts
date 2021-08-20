import {AnyAction} from 'redux';

import {LOADER_ON} from '../constants';
import {LOADER_OFF} from '../constants';

const initialState = {
  isLoading: false,
};

export const loader = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case LOADER_OFF:
      return {
        ...state,
        isLoading: false,
      };
    case LOADER_ON:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};
