import { AnyAction } from "redux";

import { GET_AUDIOBOOKS, GET_EBOOKS, GET_EBOOKS_NEXT } from "../constants";

const initialState: [] = [];

export const ebooks = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET_EBOOKS:
      return action.payload;

    case GET_EBOOKS_NEXT:
      return [...state, ...action.payload];

    case GET_AUDIOBOOKS:
      return initialState;

    default:
      return state;
  }
};
