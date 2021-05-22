import { idbPromise } from "../utils/helpers";
import {
  ADD_MULTIPLE_TO_CART,
  TOGGLE_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
} from "../actions";
// const addToCart = (data) => (dispatch) => {

// };
const toggleCart = () => (dispatch) => {
  dispatch({
    type: TOGGLE_CART,
  });
};

const addMultipleToCart = (cart) => async (dispatch) => {
  if (!cart.length) {
    const cart = await idbPromise("cart", "get");
    dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
  }
};

const updateCartQuantity = (cart, _id, item) => (dispatch) => {
  const itemInCart = cart.find((item) => item._id === _id);
  console.log(itemInCart);
  if (itemInCart) {
    dispatch({
      type: UPDATE_CART_QUANTITY,
      _id: _id,
      purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
    });
    idbPromise("cart", "put", {
      ...itemInCart,
      purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
    });
  } else {
    dispatch({
      type: ADD_TO_CART,
      product: { ...item, purchaseQuantity: 1 },
    });
    idbPromise("cart", "put", {
      ...item,
      purchaseQuantity: 1,
    });
  }
};

export { toggleCart, addMultipleToCart, updateCartQuantity };
