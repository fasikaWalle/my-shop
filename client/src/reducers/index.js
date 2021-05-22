import { combineReducers } from "redux";
import cartReducer from "../reducers/cartReducer";
import productReducer from "../reducers/productReducer";

import categoryReducer from "../reducers/categoryReducer";
export default combineReducers({
  categories: categoryReducer,
  products: productReducer,
  carts: cartReducer,
});
