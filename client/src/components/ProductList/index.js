import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";

import ProductItem from "../ProductItem";
import { QUERY_PRODUCTS } from "../../utils/queries";
import spinner from "../../assets/spinner.gif";
import * as cartAction from "../../actions/cartAction";

import * as productAction from "../../actions/productAction";
import propTypes from "prop-types";
import { connect } from "react-redux";
function ProductList({
  products,
  currentCategory,
  fetchProduct,
  updateCartQuantity,
  cart,
}) {
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    fetchProduct(data, loading);
  }, [data, loading, fetchProduct]);

  function filterProducts() {
    if (!currentCategory) {
      return products;
    }

    return products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
              updateCartQuantity={updateCartQuantity}
              cart={cart}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

propTypes.ProductList = {
  fetchProduct: propTypes.func.isRequired,
  products: propTypes.array.isRequired,
  currentCategory: propTypes.object.isRequired,
  updateCartQuantity: propTypes.func.isRequired,
  cart: propTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  products: state.products.products,
  currentCategory: state.categories.currentCategory,
  cart: state.carts.cart,
});

const mapActionToProps = {
  fetchProduct: productAction.fetchProduct,
  updateCartQuantity: cartAction.updateCartQuantity,
};

export default connect(mapStateToProps, mapActionToProps)(ProductList);
