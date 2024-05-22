import { currency } from "../util/formatting";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import { useContext } from "react";

export default function ({ mealItem }) {
  const { addItem } = useContext(CartContext);

  function handleAddToCart() {
    addItem(mealItem);
  }

  return (
    <li className="meal-item">
      <article>
        <img
          src={"http://localhost:3000/" + mealItem.image}
          alt={mealItem.name}
        />
        <div>
          <h3>{mealItem.name}</h3>
          <p className="meal-item-price">₹{currency.format(mealItem.price)}</p>
          <p className="meal-item-description">{mealItem.description}</p>
        </div>

        <p className="meal-item-actions">
          <Button onClick={handleAddToCart}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
