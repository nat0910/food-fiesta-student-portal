import { useNavigate } from "react-router-dom";
import CartCard from "../../components/cart_page_component/cart_card";
import CartEmptyScreen from "../../components/cart_page_component/cart_empty_screen";
import { useMenu } from "../../context/MenuContext";
import { newOrder } from "../../utils/firebaseConfig";
import styles from "./Cart.module.scss";

export default function Cart() {
  const { cart, setCart, menuList, handleCart } = useMenu();


  const navigate = useNavigate();

  let total = function () {
    let i = 0;
    Object.keys(cart).forEach((stall_key) => {
      const key = cart[stall_key];
      Object.keys(key).forEach((item_id) => {
        i = i + menuList[stall_key][item_id]["price"] * key[item_id];
      });
    });
    return i;
  };

  function submitOrder() {
    newOrder(cart).then(async (data) => {
      const { segments } = await data.data._path;
      setCart({});
      navigate(`/your-orders/order-details/${segments?.[1]}`);
    });
  }

  return (
    <>
      {Object.keys(cart).length === 0 ? (
        <CartEmptyScreen />
      ) : (
        <>
          <div role={"heading"} className={styles.cart_items_added_underline}>
            <p>ITEM(S) ADDED</p>
          </div>
          <div className={styles.cart_items_list_container}>
            <ul>
              {Object.keys({ ...cart })
                ?.sort(cart.sortStable)
                ?.map((stall_key, index) => {
                  return (
                    <CartCard
                      key={index}
                      stallItems={cart[stall_key]}
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
            style={{
              marginTop: "2rem",
            }}
          >
            <p>Bill summary</p>
          </div>
          <div
            className={styles.cart_items_list_container}
            style={{
              paddingBlock: ".15rem",
            }}
          >
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

          <div
            role={"heading"}
            className={styles.cart_items_added_underline}
            style={{
              marginTop: "2rem",
            }}
          >
            <p>Cancellation policy</p>
          </div>

          <div
            className={styles.cart_items_list_container}
            style={{
              paddingBlock: ".75rem",
            }}
          >
            <p>
              Please verify your order before placing it once order place it
              cannot be edited.
            </p>
          </div>

          {/* Total and Place Order button */}

          <div
            className={styles.cart_item_payment_position}
            style={{
              bottom: document
                .getElementById("primary-navigation")
                .getBoundingClientRect().height,
            }}
          >
            <div className={styles.cart_item_payment_container}>
              <div className={styles.cart_item_payment_container_content}>
                <h3>
                  {new Intl.NumberFormat("en-IN", {
                    currency: "INR",
                    style: "currency",
                  }).format(total())}
                </h3>
                <p>total</p>
              </div>
              <button
                className={styles.cart_item_payment_container_button}
                onClick={() => submitOrder()}
              >
                place order
                <span>&#9654;</span>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
