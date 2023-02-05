import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useLayoutEffect, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { collection, doc, onSnapshot } from "firebase/firestore";
import { getFirebase } from "../../utils/firebaseConfig";

import styles from "./Order.module.scss";
import OrderCardUnpaid from "../../components/order_page_component/order_page_card_unpaid";
import OrderCardStatus from "../../components/order_page_component/order_page_card_status";

export default function OrderPage() {
  const navigate = useNavigate();

  const [orderDetails, setOrderDetails] = useState({
    stall_order: {},
  });

  const { id } = useParams();

  function grand_total() {
    let grand_total = 0;
    for (const stall_key in orderDetails?.["stall_order"]) {
      const stall_key_obj =
        orderDetails["stall_order"][stall_key]["items_ordered"];
      for (const item_key in stall_key_obj) {
        if (Object.hasOwnProperty.call(stall_key_obj, item_key)) {
          const element = stall_key_obj[item_key];
          grand_total = grand_total + element["price"] * element["qty"];
        }
      }
    }
    return grand_total;
  }
  function getOrderDate(val) {
    const date = new Date(val);
    const year = date.getFullYear();
    const month = date.toLocaleDateString("default", {
      month: "long",
    });
    const day = date.getDate();
    const time = date.toLocaleTimeString();

    return `${month} ${day}, ${year} @ ${time}`;
    // console.log(returnString);
  }

  function censorEmail() {
    function censorFunc(str) {
      return str?.[0] + "*".repeat(str?.length - 2) + str?.slice(-1);
    }
    const splitdata = orderDetails?.user_info?.email?.split("@");
    const name = splitdata?.[0];
    const domain = splitdata?.[1];

    return censorFunc(name) + "@" + domain;
  }

  useEffect(() => {
    const { firestore } = getFirebase();
    const MENU_COLLECTION_ID = "orders";
    const MENU_DOC_ID = id;
    const menuCol = collection(firestore, MENU_COLLECTION_ID);
    const menuDoc = doc(menuCol, MENU_DOC_ID);

    const unsubscribe = onSnapshot(menuDoc, (document) => {
      // console.log("Current data: ", document.data());
      if (!document.exists()) {
        navigate("/error");
      }
      setOrderDetails(document.data());
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useLayoutEffect(() => {
    function layoutSetter() {
      const orderBody = document.getElementById("order-body");
      const orderheaderHeight = document
        .getElementById("order-header")
        .getBoundingClientRect().height;

      orderBody.style.paddingTop = `${orderheaderHeight}px`;
    }

    if (document.readyState === "complete") {
      layoutSetter();
    }

    window.addEventListener("load", layoutSetter);

    return () => {
      window.removeEventListener("load", layoutSetter);
    };
  }, []);

  return (
    <>
      <article>
        <div
          id="order-header"
          role={"heading"}
          className={styles.order_header_container}
        >
          <div
            className={styles.order_header_back_button}
            onClick={() => navigate("/your-orders")}
          >
            <FontAwesomeIcon icon={faArrowLeftLong} />
          </div>
          <div className={styles.order_header_content}>
            <h3>your order</h3>
            <p>{`Order id ${orderDetails?.order_id}`}</p>
          </div>
        </div>

        <article
          id="order-body"
          role={"main"}
          style={{
            paddingBottom: "5rem",
          }}
        >
          {/* Payment Status */}
          <div
            role={"status"}
            className={styles.order_body_payment_status_container}
          >
            <p>
              Payment Status :{" "}
              <span
                className={
                  orderDetails?.payment_status === "paid"
                    ? styles.payment_success_status
                    : styles.payment_failure_status
                }
              >
                {orderDetails.payment_status}
              </span>
            </p>
          </div>
          {/* Qr Code */}
          <div
            id="Qr-code-container"
            title="Qr code"
            role={""}
            className={styles.order_body_qr_code_container}
          >
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${id}`}
              alt=""
            />
            <p>{`Order id : ${orderDetails?.order_id}`}</p>
          </div>
          {/* Procced to payement counter */}
          {orderDetails.payment_status === "unpaid" && (
            <div className={styles.order_body_directing_text_container}>
              <h3>Proceed to the Payment Counter</h3>
            </div>
          )}

          {/* Order Status  */}
          {orderDetails.payment_status === "paid" && (
            <section className={styles.order_body_order_summary_container}>
              <h1>Order Status</h1>
              <div className={styles.order_body_order_summary_list_container}>
                <ul>
                  {Object?.keys(orderDetails?.stall_order)
                    ?.sort(orderDetails?.stall_order.sortStable)
                    ?.map((stall_key, index) => {
                      return (
                        <OrderCardStatus
                          index={index}
                          key={stall_key}
                          stall={stall_key}
                          stallStatus={
                            orderDetails?.stall_order[stall_key]["status"]
                          }
                          stallItems={
                            orderDetails?.stall_order[stall_key][
                              "items_ordered"
                            ]
                          }
                        />
                      );
                    })}
                </ul>
              </div>
            </section>
          )}
          {/* Order Summary */}
          <section className={styles.order_body_order_summary_container}>
            <h1>Order Summary</h1>
            <div className={styles.order_body_order_summary_list_container}>
              <ul>
                {Object?.keys(orderDetails?.stall_order)
                  ?.sort(orderDetails?.stall_order.sortStable)
                  ?.map((stall_key, index) => {
                    return (
                      <OrderCardUnpaid
                        index={index}
                        key={stall_key}
                        stall={stall_key}
                        stallItems={
                          orderDetails?.stall_order[stall_key]["items_ordered"]
                        }
                      />
                    );
                  })}
                <li
                  className={
                    styles.order_body_order_summary_list_container_grand_total
                  }
                >
                  <p role={"heading"}>Grand Total</p>
                  <p>
                    {new Intl.NumberFormat("en-IN", {
                      currency: "INR",
                      style: "currency",
                    }).format(grand_total())}
                  </p>
                </li>
              </ul>
            </div>
          </section>
          {/* Order Details */}
          <section className={styles.order_body_order_details_container}>
            <h1>Order Details</h1>
            <div className={styles.order_body_order_details_list_container}>
              <ul>
                {/* Name */}
                <li
                  className={
                    styles.order_body_order_details_list_container_data
                  }
                >
                  <h3 role={"heading"}>Name</h3>
                  <p
                    style={{
                      textTransform: "capitalize",
                    }}
                  >
                    {orderDetails?.user_info?.name}
                  </p>
                </li>
                {/* Email */}
                <li
                  className={
                    styles.order_body_order_details_list_container_data
                  }
                >
                  <h3 role={"heading"}>Email</h3>
                  <p>{censorEmail()}</p>
                </li>
                {/* Order Id */}
                <li
                  className={
                    styles.order_body_order_details_list_container_data
                  }
                >
                  <h3 role={"heading"}>Order Id</h3>
                  <p>{orderDetails?.order_id}</p>
                </li>
                {/* Order Date */}
                <li
                  className={
                    styles.order_body_order_details_list_container_data
                  }
                >
                  <h3 role={"heading"}>Order Date</h3>
                  <p>
                    {getOrderDate(
                      orderDetails?.order_placed_timestamp?.toDate()
                    )}
                  </p>
                </li>
                {/* Order Total */}
                <li
                  className={
                    styles.order_body_order_details_list_container_data
                  }
                >
                  <h3 role={"heading"}>Order Total</h3>
                  <p
                    style={{
                      letterSpacing: "1px",
                    }}
                  >
                    {new Intl.NumberFormat("en-IN", {
                      currency: "INR",
                      style: "currency",
                    }).format(grand_total())}
                  </p>
                </li>
              </ul>
            </div>
          </section>
        </article>
      </article>
    </>
  );
}
