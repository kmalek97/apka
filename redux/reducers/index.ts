import { combineReducers } from "redux";
import { loader } from "./loader";
import { user } from "./user";
import { categories } from "./categories";

const Reducers = combineReducers({
  userState: user,
  loaderState: loader,
  categories: categories,
});

export default Reducers;
