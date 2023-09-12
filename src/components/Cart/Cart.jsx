import { useContext, useState } from "react";
import CartContext from "../../store/cartContext";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import useHttp from "../../hooks/useHttp";

import styles from "./Cart.module.css";

const ORDERS_URL =
  "https://project01-2a44c-default-rtdb.europe-west1.firebasedatabase.app/orders.json";

const Cart = ({ onClose }) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [orderWasSubmitted, setOrderWasSubmitted] = useState(false);

  const {
    sendRequest: postOrder,
    isLoading: isOrderLoading,
    error: orderError,
  } = useHttp();

  const applyingOrderCreate = (orderObj) => {
    if (orderObj.name) {
      setOrderWasSubmitted(true);
      setIsCheckout(false);
      cartContext.emptyCart();
    }
  }
  const cartContext = useContext(CartContext);
  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const isEmptyCart = cartContext.items.length === 0;
  const onAddHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };
  const onRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };

  const setCheckoutHandler = () => {
    setIsCheckout(true);
  };
  const setUserHandler = async (user) => {
    await postOrder({
      url: ORDERS_URL,
      method: 'POST',
      body: { user, orderedItems: cartContext.items, total: cartContext.totalAmount },
      headers: {
        "Content-Type": "application/json",
      }
    }, applyingOrderCreate);
  };


  if (isOrderLoading) {
    return <p className={styles.alert}>Loading...</p>
  }
  if (orderWasSubmitted) {
    return <p className={styles.alert}>Order was created successfully!</p>
  }
  if (orderError) {
    return <p className={styles.alert}>{orderError}</p>
  }
  return (
    <div>
      <ul className={styles["cart-items"]}>
        {cartContext.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onAdd={onAddHandler.bind(null, item)}
            onRemove={onRemoveHandler.bind(null, item.id)}
          />
        ))}
      </ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          isCheckout={isCheckout}
          onClose={onClose}
          onSetUser={setUserHandler}
        />
      )}
      {!isCheckout && (
        <div className={styles.actions}>
          <button className={styles["button--alt"]} onClick={onClose}>
            Close
          </button>
          {!isEmptyCart && (
            <button className={styles.button} onClick={setCheckoutHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
