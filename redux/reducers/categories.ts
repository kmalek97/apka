import { AnyAction } from "redux";
import { ICategory } from "../../screens/addEbookForm/AddEbookForm.types";

import { GET_CATEGORIES_SUCCESS } from "../constants";

const initialState: ICategory[] = [];

export const categories = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS:
      return action.payload;

    default:
      return state;
  }
};
