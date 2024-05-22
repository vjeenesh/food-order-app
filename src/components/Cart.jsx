import Modal from "./UI/Modal";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgress";
import { createPortal } from "react-dom";
import CartItem from "./CartItem";
import { currency } from "../util/formatting";

export default function () {
  const cartCtx = useContext(CartContext);

  const userProgess = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );

  function handleCartClose() {
    userProgess.hideCart();
  }

  function handleCheckout() {
    userProgess.showCheckout();
  }

  return createPortal(
    <Modal
      className="cart"
      open={userProgess.progress === "cart"}
      onClose={userProgess.progress === "cart" ? handleCartClose : null}
    >
      <ul>
        {cartCtx.items.length > 0 ? (
          cartCtx.items.map((item) => {
            return (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={() => cartCtx.addItem(item)}
                onDecrease={() => cartCtx.removeItem(item.id)}
              />
            );
          })
        ) : (
          <h2>Your Cart is empty!</h2>
        )}
      </ul>
      <p className="cart-total">₹{currency.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button onClick={handleCartClose} textOnly>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleCheckout}>Checkout</Button>
        )}
      </p>
    </Modal>,
    document.getElementById("modal")
  );
}
