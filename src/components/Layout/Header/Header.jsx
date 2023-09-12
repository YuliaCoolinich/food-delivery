import image from "../../../assets/meals.jpg";
import CartButton from "./CartButton";
import styles from "./Header.module.css";

const Header = ({ onCartOpen }) => {
  return (
    <>
      <header className={styles.header}>
        <h1>Hotel EAT AND SLEEP 5* food delivery service</h1>
        <CartButton onCartOpen={onCartOpen} />
      </header>
      <div className={styles["main-image"]}>
        <img src={image} alt="table with food" />
      </div>
    </>
  );
};

export default Header;
