import styles from "./CartEmpty.module.scss";

export default function CartEmptyScreen() {
  return (
    <div className={styles.cart_empty_grid_}>
      <div className={styles.cart} >
        <h1>Your cart is empty</h1>
        <p>Looks like you haven't added anything to your cart yet</p>
      </div>
    </div>
  );
}
