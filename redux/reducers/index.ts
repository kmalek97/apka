import { combineReducers } from "redux";
import { loader } from "./loader";
import { user } from "./user";
import { categories } from "./categories";
import { ebooks } from "./ebooks";
import { audiobooks } from "./audiobooks";

const Reducers = combineReducers({
  userState: user,
  loaderState: loader,
  categories: categories,
  ebooks: ebooks,
  audiobooks: audiobooks,
});

export default Reducers;
