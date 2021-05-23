import { UPDATE_PRODUCTS, UPDATE_CURRENT_PRODUCT } from "../actions";

const initialState = {
  products: [],
  currentProduct: {},
};
function productReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PRODUCTS:
      return { ...state, products: [...action.products] };
    case UPDATE_CURRENT_PRODUCT:
      return {
        ...state,
        currentProduct: action.payload,
      };
    default:
      return state;
  }
}
export default productReducer;
