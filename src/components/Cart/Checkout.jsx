import useInput from "../../hooks/useInput";
import styles from "./Checkout.module.css";

const isInputValid = (inputValue) => inputValue.trim() !== "";

const Checkout = (props) => {
  const { onSetUser, onClose } = props;

  const {
    value: nameValue,
    isValid: nameIsValid,
    showError: nameShowError,
    onBlur: nameOnBlur,
    onChange: nameOnChange,
  } = useInput(isInputValid);

  const {
    value: addressValue,
    isValid: addressIsValid,
    showError: addressShowError,
    onBlur: addressOnBlur,
    onChange: addressOnChange,
  } = useInput(isInputValid);

  const onConfirmHandler = (event) => {
    event.preventDefault();

    if (!nameIsValid || !addressIsValid) {
      return;
    }
    onSetUser({
      name: nameValue,
      address: addressValue,
    });
  };
  const isFormCorrect = nameIsValid && addressIsValid;
  return (
    <form className={styles.form} onSubmit={onConfirmHandler}>
      <div
        className={`${styles.control} ${nameShowError ? styles.invalid : ""}`}
      >
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          onBlur={nameOnBlur}
          onChange={nameOnChange}
          value={nameValue}
        />
        {nameShowError && <p>Input correct name</p>}
      </div>
      <div
        className={`${styles.control} ${addressShowError ? styles.invalid : ""}`}
      >
        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          onBlur={addressOnBlur}
          onChange={addressOnChange}
          value={addressValue}
        />
        {addressShowError && <p>Input correct address</p>}
      </div>
      <div>
        <div className={styles.actions}>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button
            className={`${!isFormCorrect ? styles["disabled-button"] : ''}`}
            disabled={!isFormCorrect}
          >
            Confirm
          </button>
        </div>
      </div>
    </form>
  );
};

export default Checkout;
