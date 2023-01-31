import styles from "./CartCard.module.scss";

export default function CartCard({
  stallItems,
  index,
  stall,
  menuList,
  cart,
  setCart,
  handleCart
}) {


  return (
    <ul key={index}>
      {Object.keys(stallItems).map((item_id, index) => {
        return (
          <li key={index} className={styles.cart_item_details_container_}>
            <div className={styles.cart_item_details_container_header}>
              <p>{menuList[item_id]["name"]}</p>
              <p>
                {new Intl.NumberFormat("en-IN", {
                  currency: "INR",
                  style: "currency",
                }).format(menuList[item_id]["price"])}
              </p>
            </div>

            <div className={styles.cart_item_details_container_body}>
              <div
                className={styles.cart_item_details_container_body_button_group}
              >
                <button
                  id="decrement-button"
                  onClick={(e) => {
                    handleCart(e, stallItems[item_id], stall, item_id);
                  }}
                >
                  &#8722;
                </button>
                <p>{stallItems[item_id]}</p>
                <button
                  id="increment-button"
                  onClick={(e) => {
                    handleCart(e, stallItems[item_id], stall, item_id);
                  }}
                >
                  &#43;
                </button>
              </div>
              <p
                className={
                  styles.cart_item_details_container_body_total_item_price
                }
              >
                {new Intl.NumberFormat("en-IN", {
                  currency: "INR",
                  style: "currency",
                }).format(menuList[item_id]["price"] * stallItems[item_id])}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
    //       <li key={index} className={styles.cart_item_details_container_}>
    // </li>
  );
}
