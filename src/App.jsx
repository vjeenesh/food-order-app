import Header from "./components/Header";
import Meals from "./components/Meals";
import useFetch from "./hooks/useFetch";
import { fetchMeals } from "./util/fetch";
import { CartContextProvider } from "./store/CartContext";
import Cart from "./components/Cart";
import { UserProgressProvider } from "./store/UserProgress";
import Checkout from "./components/Checkout";

function App() {
  return (
    <UserProgressProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgressProvider>
  );
}

export default App;
