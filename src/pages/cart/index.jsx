import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartCard from "../../components/cart_page_component/cart_card";
import CartEmptyScreen from "../../components/cart_page_component/cart_empty_screen";
import CartModalScreen from "../../components/cart_page_component/cart_modal_screen";
import { useMenu } from "../../context/MenuContext";
import { newOrder } from "../../utils/firebaseConfig";
import styles from "./Cart.module.scss";

export default function Cart() {
  const {
    cart,
    setCart,
    menuList,
    handleCart,
    modalOpen,
    setModalOpen,
    paymentloader,
    setLoader,
  } = useMenu();

  const navigate = useNavigate();

  const total = useCallback(
    function () {
      let i = 0;
      Object.keys(cart).forEach((stall_key) => {
        const key = cart?.[stall_key];
        Object.keys(key).forEach((item_id) => {
          i = i + menuList?.[stall_key]?.[item_id]?.["price"] * key?.[item_id];
        });
      });
      return i;
    },
    [cart]
  );

  function submitOrder() {
    let text =
      "Order once placed cannot be edited . Are you sure don't want to change in any item in your cart ";

    let bool = confirm(text);

    if (bool) {
      newOrder(cart)
        .then(async (data) => {
          const { segments } = await data.data._path;
          setCart({});
          setLoader(false);
          navigate(`/your-orders/order-details/${segments?.[1]}`);
        })
        .catch((err) => {
          setLoader(false);
          throw err;
        });
    }
    if (!bool) {
      setLoader(false);
    }
  }

  useEffect(() => {
    function removeUnavail() {
      for (const stall_key in cart) {
        const element = cart[stall_key];
        const menuItem = menuList[stall_key];
        for (const item_key in element) {
          const result = menuItem?.[item_key]?.availability;

          if (!result) {
            setModalOpen({
              open: !result,
              msg: "A item was removed from your cart, since it went out of stock!",
            });

            delete cart[stall_key][item_key];
            setCart({
              ...cart,
              [stall_key]: {
                ...cart[stall_key],
              },
            });

            const boolDel = Object.keys(cart[stall_key]).length === 0;
            if (boolDel) {
              delete cart[stall_key];
              setCart({ ...cart });
            }
          }
        }
      }
    }
    removeUnavail();
    return () => {};
  }, [menuList]);

  return (
    <>
      {modalOpen.open ? (
        <CartModalScreen msg={modalOpen.msg} setModalOpen={setModalOpen} />
      ) : Object.keys(cart).length === 0 ? (
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
                      stallItems={cart?.[stall_key]}
                      index={stall_key}
                      menuList={menuList?.[stall_key]}
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
              marginTop: "1.5rem",
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
              marginTop: "1.5rem",
            }}
          >
            <p>Cancellation policy</p>
          </div>

          <div
            className={styles.cart_items_list_container}
            style={{
              paddingBlock: ".75rem",
              fontSize: ".85rem",
            }}
          >
            <p
              style={{
                textAlign: "justify",
              }}
            >
              Cancellation will only be applicable at the discretion of the
              E-Cell Team. Following which, a refund will be initiated at the
              Refund Counter. The value for said refund will be calculated
              against the item(s) ordered from the one/more stalls. The user can
              neither initiate an order cancellation nor request a refund once
              the order has been paid for.
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
                onClick={() => {
                  setLoader(true);
                  submitOrder();
                }}
              >
                {paymentloader ? (
                  <div className={styles.loader}></div>
                ) : (
                  <>
                    place order
                    <span>&#9654;</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
