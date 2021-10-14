import { AnyAction } from "redux";
import { ICosTam } from "../../screens/addEbookForm/AddEbookForm.types";

import { GET_CATEGORIES_SUCCESS } from "../constants";

const initialState: ICosTam[] = [];

export const categories = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS:
      console.log("payload", action.payload);
      return action.payload;

    default:
      return state;
  }
};
