import { idbPromise } from "../utils/helpers";
import {
  ADD_MULTIPLE_TO_CART,
  TOGGLE_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  REMOVE_FROM_CART,
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

const removeFromCart = (item) => (dispatch) => {
  dispatch({
    type: REMOVE_FROM_CART,
    _id: item._id,
  });
  idbPromise("cart", "delete", { ...item });
};

const onChangeUpdateCartQuantity = (value, item) => (dispatch) => {
  if (value === "0") {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
    idbPromise("cart", "delete", { ...item });
  } else {
    dispatch({
      type: UPDATE_CART_QUANTITY,
      _id: item._id,
      purchaseQuantity: parseInt(value),
    });
    idbPromise("cart", "put", { ...item, purchaseQuantity: parseInt(value) });
  }
};

const addItemToCart = (cart, id,currentProduct) => (dispatch) => {
  const ItemInCart = cart.find((cartItem) => cartItem._id === id);
  if (ItemInCart) {
    dispatch({
      type: UPDATE_CART_QUANTITY,
      _id: id,
      purchaseQuantity: parseInt(ItemInCart.purchaseQuantity) + 1,
    });
    idbPromise("cart", "put", {
      ...ItemInCart,
      purchaseQuantity: parseInt(ItemInCart.purchaseQuantity) + 1,
    });
  } else {
    dispatch({
      type: ADD_TO_CART,
      product: { ...currentProduct, purchaseQuantity: 1 },
      cartOpen: true,
    });
    idbPromise("cart", "put", {
      ...currentProduct,
      purchaseQuantity: 1,
    });
  }
};
const removeItemFromCart = (currentProduct) => (dispatch) => {
  dispatch({
    type: REMOVE_FROM_CART,
    _id: currentProduct._id,
  });
  idbPromise("cart", "delete", {
    ...currentProduct,
  });
};
export {
  toggleCart,
  addMultipleToCart,
  updateCartQuantity,
  removeFromCart,
  onChangeUpdateCartQuantity,
  addItemToCart,
  removeItemFromCart,
};
