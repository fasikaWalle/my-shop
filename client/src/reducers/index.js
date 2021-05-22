import { combineReducers } from "redux";
// import postReducer from "../reducers/postReducer";
// import CountReducers from "./CountReducers.js";
import categoryReducer from "../reducers/categoryReducer";
export default combineReducers({
  categories: categoryReducer,
  // counts: CountReducers,
});
