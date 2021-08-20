import { AnyAction } from "redux";
import firebase from "firebase";

import { USER_DATA_CHANGE } from "../constants";

const initialState = {
  userId: "",
  userEmail: "",
  userRole: "",
};

const fetchData = async () => {
  // await firestore()
  //   .collection('users')
  //   .doc('JZHQ41waMATI3iMJRw4gadPKT5y1')
  //   .get()
  //   .data();

  await firebase
    .firestore()
    .collection("users")
    .doc("JZHQ41waMATI3iMJRw4gadPKT5y1")
    .set({});
};

export const user = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case USER_DATA_CHANGE:
      return {
        ...state,
        userId: action.payload.uid,
        userEmail: action.payload.email,
        userRole: action.payload.role,
      };
    default:
      return state;
  }
};
