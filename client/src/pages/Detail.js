import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import Cart from "../components/Cart";
import propTypes from "prop-types";
import { QUERY_PRODUCTS } from "../utils/queries";
import spinner from "../assets/spinner.gif";

import * as cartAction from "../actions/cartAction";
import * as productAction from "../actions/productAction";

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

  const { loading, data } = useQuery(QUERY_PRODUCTS);
  console.log(products);
  useEffect(() => {
    updateCurrentProduct(products, data, loading, id);
  }, [products, id, data, loading, currentProduct, updateCurrentProduct]);
  return (
    <>
      {currentProduct && cart ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{" "}
            <button onClick={() => addItemToCart(cart, id, currentProduct)}>
              Add to Cart
            </button>
            <button
              disabled={!cart.find((p) => currentProduct._id === p._id)}
              onClick={() => removeItemFromCart(currentProduct)}
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
