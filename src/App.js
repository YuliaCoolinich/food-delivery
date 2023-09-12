import { useState } from "react";
import Header from "./components/Layout/Header/Header";
import Meals from "./components/Meals/Meals";
import Modal from "./components/UI/Modal/Modal";
import Cart from "./components/Cart/Cart";
import CartProvider from './components/Layout/CartProvider/CartProvider';

function App() {
  const [cartIsShown, setIsShown] = useState(false);
  const showCart = () => {
    setIsShown(true);
  };
  const hideCart = () => {
    setIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown ? (
        <Modal onClose={hideCart}>
          <Cart onClose={hideCart} />
        </Modal>
      ) : null}
      <Header onCartOpen={showCart} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
