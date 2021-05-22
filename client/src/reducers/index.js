import { combineReducers } from "redux";
// import postReducer from "../reducers/postReducer";
import productReducer from "../reducers/productReducer";

import categoryReducer from "../reducers/categoryReducer";
export default combineReducers({
  categories: categoryReducer,
  products: productReducer,
});
