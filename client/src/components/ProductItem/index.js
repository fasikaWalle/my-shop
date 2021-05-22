import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";

// import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
// import { idbPromise } from "../../utils/helpers";
function ProductItem(item) {
  console.log(item);
  const { image, name, _id, price, quantity } = item;
  // const [state, dispatch] = useStoreContext();
  // const addToCart = () => {
  //   const itemInCart = state.cart.find((item) => item._id === _id);
  //   if (itemInCart) {
  //     dispatch({
  //       type: UPDATE_CART_QUANTITY,
  //       _id: _id,
  //       purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
  //     });
  //     idbPromise("cart", "put", {
  //       ...itemInCart,
  //       purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
  //     });
  //   } else {
  //     dispatch({
  //       type: ADD_TO_CART,
  //       product: { ...item, purchaseQuantity: 1 },
  //     });
  //     idbPromise("cart", "put", {
  //       ...item,
  //       purchaseQuantity: 1,
  //     });
  //   }
  // };
  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img alt={name} src={`/images/${image}`} />
        <p>{name}</p>
      </Link>
      <div>
        <div>
          {quantity} {pluralize("item", quantity)} in stock
        </div>
        <span>${price}</span>
      </div>
      <button>Add to cart</button>
      {/* onClick={addToCart} */}
    </div>
  );
}

export default ProductItem;