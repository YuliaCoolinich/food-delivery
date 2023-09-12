import { useContext } from "react";
import CartContext from "../../../store/cartContext";
import MealItemForm from "./MealItemForm";
import styles from "./MealItem.module.css";

const MealItem = ({ meal }) => {
  const cardContext = useContext(CartContext);
  const onAddToCartHandler = (itemAmount) => {
    cardContext.addItem({
      id: meal.id,
      name: meal.name,
      amount: +itemAmount,
      price: +meal.price,
    });
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{meal.name}</h3>
        <div className={styles.description}>{meal.description}</div>
        <div className={styles.price}>${meal.price.toFixed(2)}</div>
      </div>
      <div>
        <MealItemForm id={meal.id} onAddToCart={onAddToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
