import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingCartIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items];
    if (existingCartIndex > -1) {
      const existingItem = updatedItems[existingCartIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };

      updatedItems[existingCartIndex] = updatedItem;
    } else {
      updatedItems.push({
        ...action.item,
        quantity: 1,
      });
    }

    return { ...state, items: updatedItems };
  } else if (action.type === "REMOVE_ITEM") {
    const existingCartIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const updatedItems = [...state.items];

    if (existingCartIndex > -1) {
      if (updatedItems[existingCartIndex].quantity === 1) {
        updatedItems.splice(existingCartIndex, 1);
      } else {
        const existingItem = updatedItems[existingCartIndex];
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };

        updatedItems[existingCartIndex] = updatedItem;
      }
    }

    return { ...state, items: updatedItems };
  } else if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatch({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    dispatch({ type: "REMOVE_ITEM", id });
  }

  function clearCart() {
    dispatch({ type: "CLEAR_CART" });
  }

  const cartContextValue = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  // console.log(cartContextValue);

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
