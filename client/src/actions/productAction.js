import { useQuery } from "@apollo/react-hooks";
import { UPDATE_PRODUCTS, UPDATE_CURRENT_PRODUCT } from "../actions";
import { idbPromise } from "../utils/helpers";
const fetchProduct = (data, loading) => (dispatch) => {
  if (data) {
    dispatch({
      type: UPDATE_PRODUCTS,
      products: data.products,
    });
    data.products.forEach((product) => {
      idbPromise("products", "put", product);
    });
  } else if (!loading) {
    idbPromise("products", "get").then((products) => {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: products,
      });
    });
  }
};

const updateCurrentProduct = (products, data, loading, id) => (dispatch) => {
  console.log(products, "this is the product");
  if (products.length) {
    const currentProduct = products.find((product) => product._id === id);

    dispatch({
      type: UPDATE_CURRENT_PRODUCT,
      payload: currentProduct,
    });
    //set current product to
  } else if (data) {
    dispatch({
      type: UPDATE_PRODUCTS,
      products: data.products,
    });
    data.products.forEach((product) => {
      idbPromise("products", "put", product);
    });
  } else if (!loading) {
    idbPromise("products", "get").then((indexedproducts) => {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: indexedproducts,
      });
    });
  }
};

export { fetchProduct, updateCurrentProduct };
