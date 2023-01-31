import CartCard from "../../components/cart_page_component/cart_card";
import CartEmptyScreen from "../../components/cart_page_component/cart_empty_screen";
import { useMenu } from "../../context/MenuContext";
import styles from "./Cart.module.scss";

import TestCart from "../../utils/data/TestCart.json";
import { useState } from "react";

export default function Cart() {
  const { cart, setCart ,menuList , handleCart} = useMenu();

  // const {menuList} = useMenu()

  // console.log(cart);

  // const [cart, setCart] = useState(TestCart);

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
        </>
      )}
    </>
  );
}
