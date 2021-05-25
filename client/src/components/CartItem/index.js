import React from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import * as cartAction from "../../actions/cartAction";
const CartItem = ({ item, removeFromCart, onChangeUpdateCartQuantity }) => {
  const removeItemFromCart = (item) => {
    removeFromCart(item);
  };
  const onChange = (event) => {
    let value = event.target.value;
    onChangeUpdateCartQuantity(value, item);
  };
  return (
    <div className="flex-row">
      <div>
        <img src={`/images/${item.image}`} alt="" />
      </div>
      <div>
        <div>
          {item.name}, ${item.price}
        </div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeItemFromCart(item)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
};
propTypes.CartItem = {
  removeFromCart: propTypes.func.isRequired,
  onChangeUpdateCartQuantity: propTypes.func.isRequired,
  item: propTypes.object.isRequired,
};

export default CartItem;
