import { useContext, useEffect, useState } from "react";
import CartIcon from "../../Cart/CartIcon";
import CartContext from "../../../store/cartContext";
import styles from "./CartButton.module.css";

const CardButton = ({ onCartOpen }) => {
  const { items } = useContext(CartContext);
  const cartItemsCount = items.reduce(
    (currentCount, item) => item.amount + currentCount,
    0
  );
  const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);
  const buttonClasses = `${styles.button} ${
    buttonIsHighlighted ? styles.bump : ""
  }`;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setButtonIsHighlighted(true);
    const timer = setTimeout(() => {
      setButtonIsHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={buttonClasses} onClick={onCartOpen}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{cartItemsCount}</span>
    </button>
  );
};

export default CardButton;
