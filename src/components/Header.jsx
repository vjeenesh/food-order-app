import { useContext } from "react";
import logoPng from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgress";

export default function Header() {
  const { items } = useContext(CartContext);
  const userProgess = useContext(UserProgressContext);

  const totalCartItems = items.reduce(
    (prevValues, currentValues) => prevValues + currentValues.quantity,
    0
  );

  function handleCartOpen() {
    userProgess.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoPng} alt="Food Logo" />
        <h1>Food Order App</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleCartOpen}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
