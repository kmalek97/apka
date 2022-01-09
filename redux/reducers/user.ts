import { AnyAction } from "redux";

import { USER_DATA_CHANGE, USER_SET_AVATAR } from "../constants";

const initialState = {
  userId: "",
  userEmail: "",
  userRole: "",
  userName: "",
  userAvatar: "",
  odservedEbooks: [],
  odservedAudiobooks: [],
};

export const user = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case USER_SET_AVATAR:
      return {
        ...state,
        userAvatar: action.payload,
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
    default:
      return state;
  }
};
