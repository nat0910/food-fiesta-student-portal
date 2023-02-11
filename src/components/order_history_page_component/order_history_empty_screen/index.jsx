import styles from "./OrderEmptyScreen.module.scss";

export default function OrderEmptyScreen() {
  return (
    <div className={styles.cart_empty_grid_}>
      <div className={styles.cart_empty_container}>
        <h1>You haven't placed any orders yet.</h1>
        <p>When you do, their status will appear here.</p>
      </div>
    </div>
  );
}
