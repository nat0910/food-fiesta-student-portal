import { Link } from "react-router-dom";
import styles from "./CartEmpty.module.scss";

export default function CartEmptyScreen() {
  return (
    <div className={styles.cart_empty_grid_}>
      <div className={styles.cart_empty_container}>
        <div className={styles.cart_empty_container_header}>
          <h1>Oops! Your cart is empty</h1>
          <p>Looks like you haven't added anything to your cart yet</p>
        </div>
        <div className={styles.cart_empty_button_container}>
          <Link to={"/"} className={styles.cart_empty_button_}>
            Add items to cart
          </Link>
        </div>
      </div>
    </div>
  );
}
