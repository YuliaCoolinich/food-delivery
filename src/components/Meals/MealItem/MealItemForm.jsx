import { useState, useRef } from "react";
import Input from "../../UI/Input/Input";
import styles from "./MealItemForm.module.css";

const ERROR_MESSAGE = 'Enter valid amount value';

const MealItemForm = ({ id, onAddToCart }) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInput = useRef();

  const onAddHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInput.current.value;
    if (enteredAmount.trim().length === 0 || enteredAmount < 1) {
      setAmountIsValid(false);
      return;
    }
    if (!amountIsValid) {
      setAmountIsValid(true);
    }

    onAddToCart( +amountInput.current.value);
  };
  return (
    <form className={styles.form}>
      <Input
        ref={amountInput}
        label="Amount"
        input={{
          id: `amount_${id}`,
          type: "number",
          min: "1",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button onClick={onAddHandler}>+ Add</button>
      {!amountIsValid && <p>{ERROR_MESSAGE}</p>}
    </form>
  );
};

export default MealItemForm;
