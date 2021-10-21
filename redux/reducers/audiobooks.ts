import { AnyAction } from "redux";

import { GET_AUDIOBOOKS, GET_AUDIOBOOKS_NEXT, GET_EBOOKS } from "../constants";

const initialState: [] = [];

export const audiobooks = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET_AUDIOBOOKS:
      return action.payload;
    case GET_AUDIOBOOKS_NEXT:
      return [...state, ...action.payload];
    case GET_EBOOKS:
      return initialState;

    default:
      return state;
  }
};
