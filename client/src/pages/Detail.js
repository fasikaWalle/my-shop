import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import Cart from "../components/Cart";
import propTypes from "prop-types";
import { QUERY_PRODUCTS } from "../utils/queries";
import spinner from "../assets/spinner.gif";
// import { useStoreContext } from "../utils/GlobalState";
import * as cartAction from "../actions/cartAction";
import * as productAction from "../actions/productAction";
// import {
//   UPDATE_PRODUCTS,
//   ADD_TO_CART,
//   REMOVE_FROM_CART,
//   UPDATE_CART_QUANTITY,
// } from "../utils/actions";
// import { idbPromise } from "../utils/helpers";
import { connect } from "react-redux";
function Detail({
  cart,
  products,
  updateCurrentProduct,
  currentProduct,
  addItemToCart,
  removeItemFromCart,
}) {
  const { id } = useParams();
  // const [state, dispatch] = useStoreContext();
  // const { products, cart } = state;
  // const [currentProduct, setCurrentProduct] = useState({});
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  console.log(products);
  useEffect(() => {
    updateCurrentProduct(products, data, loading, id);
    // if (products.length) {
    //   setCurrentProduct(products.find((product) => product._id === id));
    // } else if (data) {
    //   dispatch({
    //     type: UPDATE_PRODUCTS,
    //     products: data.products,
    //   });
    //   data.products.forEach((product) => {
    //     idbPromise("products", "put", product);
    //   });
    // } else if (!loading) {
    //   idbPromise("products", "get").then((indexedproducts) => {
    //     dispatch({
    //       type: UPDATE_PRODUCTS,
    //       products: indexedproducts,
    //     });
    //   });
    // }
  }, [products, id, data, loading, currentProduct]);

  const addToCart = () => {
    addItemToCart(cart, id, currentProduct);

    //  const ItemInCart = cart.find((cartItem) => cartItem._id === id);
    //   if (ItemInCart) {
    //     dispatch({
    //       type: UPDATE_CART_QUANTITY,
    //       _id: id,
    //       purchaseQuantity: parseInt(ItemInCart.purchaseQuantity) + 1,
    //     });
    //     idbPromise("cart", "put", {
    //       ...ItemInCart,
    //       purchaseQuantity: parseInt(ItemInCart.purchaseQuantity) + 1,
    //     });
    //   } else {
    //     dispatch({
    //       type: ADD_TO_CART,
    //       product: { ...currentProduct, purchaseQuantity: 1 },
    //       cartOpen: true,
    //     });
    //     idbPromise("cart", "put", {
    //       ...currentProduct,
    //       purchaseQuantity: 1,
    //     });
    //   }
  };
  const removeFromCart = () => {
    removeItemFromCart(currentProduct);
    // dispatch({
    //   type: REMOVE_FROM_CART,
    //   _id: currentProduct._id,
    // });
    // idbPromise("cart", "delete", {
    //   ...currentProduct,
    // });
  };

  return (
    <>
      {currentProduct && cart ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{" "}
            <button onClick={addToCart}>Add to Cart</button>
            <button
              disabled={!cart.find((p) => currentProduct._id === p._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}
propTypes.Detail = {
  cart: propTypes.array.isRequired,
  products: propTypes.array.isRequired,
  currentProduct: propTypes.object.isRequired,
  addItemToCart: propTypes.func.isRequired,
  removeItemFromCart: propTypes.func.isRequired,
  updateCurrentProduct: propTypes.func.isRequired,
};

const mapActionToProps = {
  addItemToCart: cartAction.addItemToCart,
  removeItemFromCart: cartAction.removeFromCart,
  updateCurrentProduct: productAction.updateCurrentProduct,
};
const mapStateToProps = (state) => ({
  cart: state.carts.cart,
  products: state.products.products,
  currentProduct: state.products.currentProduct,
});
export default connect(mapStateToProps, mapActionToProps)(Detail);
