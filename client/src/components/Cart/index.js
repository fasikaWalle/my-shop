import React, { useEffect } from "react";
import CartItem from "../CartItem";
import Auth from "../../utils/auth";
import propTypes from "prop-types";
import "./style.css";
// import { useStoreContext } from "../../utils/GlobalState";
// import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions";
// import { idbPromise } from "../../utils/helpers";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/react-hooks";
// import { toggleCart } from "../../actions/cartAction";
import * as cartAction from "../../actions/cartAction";
import { connect } from "react-redux";
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Cart = ({ cart, cartOpen, addMultipleToCart, toggleCart }) => {
  // const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  useEffect(() => {
    // async function getCart() {
    //   const cart = await idbPromise("cart", "get");
    //   dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    // }

    // if (!state.cart.length) {
    //   getCart();
    // }
    addMultipleToCart(cart);
  }, [cart.length, addMultipleToCart]);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  const toggleCartContainer = () => {
    toggleCart();
  };
  const calculateTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.purchaseQuantity;
    });
    return total.toFixed(2);
  };
  if (!cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCartContainer}>
        <span role="img" aria-label="trash">
          🛒
        </span>
      </div>
    );
  }
  function submitCheckout() {
    const productIds = [];
    cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });
    getCheckout({
      variables: { products: productIds },
    });
  }
  return (
    <div className="cart">
      <div className="close" onClick={toggleCart}>
        [close]
      </div>
      <h2>Shopping Cart</h2>
      {cart.length ? (
        <div>
          {cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>
            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
            😱
          </span>
          You haven't added anything to your cart yet!
        </h3>
      )}
    </div>
  );
};
propTypes.Cart = {
  // addToCart: propTypes.func.isRequired,
  toggleCart: propTypes.func.isRequired,
  addMultipleToCart: propTypes.func.isRequired,
  cart: propTypes.object.isRequired,
  cartOpen: propTypes.bool.isRequired,
};

const mapActionToProps = {
  // addToCart: cartAction.addToCart,
  toggleCart: cartAction.toggleCart,
  addMultipleToCart: cartAction.addMultipleToCart,
};

const mapStateToProps = (state) => ({
  cart: state.carts.cart,
  cartOpen: state.carts.cartOpen,
});

export default connect(mapStateToProps, mapActionToProps)(Cart);
