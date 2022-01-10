import { AnyAction } from "redux";

import {
  GET_PAYMENT_STATUS,
  USER_DATA_CHANGE,
  USER_OBSERVED_CHANGE,
  USER_SET_AVATAR,

} from "../constants";

const initialState = {
  userId: "",
  userEmail: "",
  userRole: "",
  userName: "",
  userAvatar: "",
  odservedEbooks: [],
  odservedAudiobooks: [],
  paymentStatus: '',
};

export const user = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case USER_SET_AVATAR:
      return {
        ...state,
        userAvatar: action.payload,
      };
    case GET_PAYMENT_STATUS:
      return {
        ...state,
        paymentStatus: action.payload,
      };
    case USER_DATA_CHANGE:
      return {
        ...state,
        userId: action.payload.uid,
        userEmail: action.payload.email,
        userRole: action.payload.role,
        userName: action.payload.nickname,
        userAvatar: action.payload.downloadURL,
        observedEbooks: action.payload.observedEbooks,
        observedAudiobooks: action.payload.observedAudiobooks,
      };
    case USER_OBSERVED_CHANGE:
      return {
        ...state,
        observedEbooks: action.payload.observedEbooks,
        observedAudiobooks: action.payload.observedAudiobooks,
      };
    default:
      return state;
  }
};
