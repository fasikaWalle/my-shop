import { useQuery } from "@apollo/react-hooks";
import { UPDATE_PRODUCTS } from "../actions";
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

export { fetchProduct };
