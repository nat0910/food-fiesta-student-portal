import CartCard from "../../components/cart_page_component/cart_card";
import CartEmptyScreen from "../../components/cart_page_component/cart_empty_screen";
import { useMenu } from "../../context/MenuContext";
import styles from "./Cart.module.scss";

export default function Cart() {
  const { cart, setCart, menuList, handleCart } = useMenu();

  let total = function () {
    let i = 0;
    Object.keys(cart).forEach((stall_key) => {
      const key = cart[stall_key]["items_ordered"];
      Object.keys(key).forEach((item_id) => {
        i = i + menuList[stall_key][item_id]["price"] * key[item_id];
      });
    });
    return i;
  };

  return (
    <>
      {Object.keys(cart).length === 0 ? (
        <CartEmptyScreen />
      ) : (
        <>
          <div
            role={"heading"}
            className={styles.cart_items_added_underline}
            data-heading-title={"ITEM(S) ADDED"}
          />
          <div className={styles.cart_items_list_container}>
            <ul>
              {Object.keys({ ...cart })
                ?.sort(cart.sortStable)
                ?.map((stall_key, index) => {
                  return (
                    <CartCard
                      key={index}
                      stallItems={cart[stall_key]["items_ordered"]}
                      index={stall_key}
                      menuList={menuList[stall_key]}
                      stall={stall_key}
                      cart={cart}
                      setCart={setCart}
                      handleCart={handleCart}
                    />
                  );
                })}
            </ul>
          </div>
          <div
            role={"heading"}
            className={styles.cart_items_added_underline}
            data-heading-title={"billing summary"}
            style={{
              marginTop: "2rem",
            }}
          />
          <div className={styles.cart_items_list_container}>
            <div className={styles.cart_items_list_container_grand_total}>
              <p>Grand Total</p>
              <p>
                {new Intl.NumberFormat("en-IN", {
                  currency: "INR",
                  style: "currency",
                }).format(total())}
              </p>
            </div>
          </div>
          <div className={styles.cart_item_payment_container}></div>
        </>
      )}
    </>
  );
}
