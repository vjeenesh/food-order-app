import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currency } from "../util/formatting";
import { useContext } from "react";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgress";
import useHTTP from "../hooks/useHTTP";

const requestConfig = {
  method: "post",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const { isLoading, error, sendRequest, data, clearData } = useHTTP(
    "http://localhost:3000/orders",
    requestConfig
  );

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData(e.target);
    const customerData = Object.fromEntries(fd.entries());

    // console.log(customerData, cartCtx.items);
    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit</Button>
    </>
  );
  if (isLoading) {
    actions = (
      <>
        <h2>Processing your order...</h2>
      </>
    );
  }

  if (error) {
    actions = (
      <>
        <h2>
          {error.message || "Order could not be processed, please try again!"}
        </h2>
        <Button type="button" textOnly onClick={handleClose}>
          Close
        </Button>
      </>
    );
  }

  if (data) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleClose}
      >
        <h2>Order Received!</h2>
        <p>
          Thank you for shopping with us! We will send you more details via
          email soon.
        </p>
        <p className="modal-actions">
          <Button type="button" onClick={handleFinish}>
            Okay
          </Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: ₹{currency.format(cartTotal)}</p>
        <Input id="full-name" label="Full Name" type="text" />
        <Input id="email" label="Email" type="email" />
        <Input id="street" label="Street" type="text" />
        <div className="control-row">
          <Input id="postal-code" label="Postal Code" type="text" />
          <Input id="city" label="City" type="text" />
        </div>
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
