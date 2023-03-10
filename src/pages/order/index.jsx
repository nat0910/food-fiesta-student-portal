import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useLayoutEffect, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { collection, doc, onSnapshot } from "firebase/firestore";
import { getFirebase } from "../../utils/firebaseConfig";

import styles from "./Order.module.scss";
import OrderCardUnpaid from "../../components/order_page_component/order_page_card_unpaid";
import OrderCardStatus from "../../components/order_page_component/order_page_card_status";

import { Link } from "react-router-dom";

import { QRCode } from "react-qrcode-logo";

import StallNames from "../../utils/data/stallNames.json";

import { toast } from "react-toastify";
import FFLOGO from "../../assets/images/FF_logo_white_back.png";
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

  function stallCancelled() {
    let str = "";
    Object.keys(orderDetails?.stall_order).forEach((stall_key) => {
      if (orderDetails?.stall_order?.[stall_key]?.["status"] === "cancelled") {
        str = str + `${StallNames?.[stall_key]?.["name"] || stall_key}, `;
      }
    });
    return str;
  }

  function isCancelled() {
    let array = new Array();
    Object.keys(orderDetails?.stall_order).forEach((stall_key) => {
      const element = orderDetails?.stall_order?.[stall_key]?.["status"];
      array.push(element);
    });
    if (array.includes("cancelled")) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    const { firestore } = getFirebase();
    const MENU_COLLECTION_ID = "orders";
    const MENU_DOC_ID = id;
    const menuCol = collection(firestore, MENU_COLLECTION_ID);
    const menuDoc = doc(menuCol, MENU_DOC_ID);

    const unsubscribe = onSnapshot(menuDoc, (document) => {
      if (orderDetails.stall_order?.payment_status === {}) {
        toast(
          <Link to={`/your-orders/order-details/${document.id}`}>
            #{document.data().order_id} Order Status Updated!!
          </Link>,
          {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        if (!("Notification" in window)) {
          console.log("Browser does not support desktop notification");
        } else {
          if (Notification.permission === "granted") {
            var options = {
              body:
                "#" + change.doc.data().order_id + " Order Status Updated!!",
              dir: "ltr",
            };

            const notification = new Notification(
              "Order Status Updated!!",
              options
            );
            // notification.onclick = function (e) {
            //   e.preventDefault();
            //   window.open("http://www.mozilla.org", "_blank");
            // };
          }
        }
        // console.log("UPDATED", document.data());
      }
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
  const [imageUrl, setImageUrl] = useState("");

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
          <button
            className={styles.order_header_back_button}
            onClick={() => navigate("/your-orders")}
          >
            <FontAwesomeIcon icon={faArrowLeftLong} />
          </button>
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
                  orderDetails?.payment_status === "paid" ||
                  orderDetails?.payment_status === "cancelled"
                    ? styles.payment_success_status
                    : styles.payment_failure_status
                }
              >
                {orderDetails?.payment_status === "cancelled"
                  ? "Paid"
                  : orderDetails.payment_status}
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
            <QRCode
              size="232"
              fgColor="#7E1F1F"
              value={orderDetails?.order_id?.toString()}
              logoImage={FFLOGO}
              logoWidth={55}
            />
            {/* <img src={imageUrl} alt="" /> */}
            <p>{`Order id : ${orderDetails?.order_id}`}</p>
          </div>
          {/* Procced to payment counter */}
          {orderDetails.payment_status === "unpaid" && (
            <div className={styles.order_body_directing_text_container}>
              <h3
                style={{
                  textTransform: "capitalize",
                }}
              >
                Proceed to the Payment Counter, to pay for your order
              </h3>
            </div>
          )}
          {/* Procced to refund counter */}
          {isCancelled() && (
            <div className={styles.order_body_directing_text_container}>
              <h3>
                Proceed to the refund counter, to collect your refund for{" "}
                <span>{stallCancelled()} </span>
              </h3>
            </div>
          )}

          {/* Order Status  */}
          {(orderDetails.payment_status === "paid" ||
            orderDetails.payment_status === "cancelled") && (
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
                            orderDetails?.stall_order?.[stall_key]?.["status"]
                          }
                          stallItems={
                            orderDetails?.stall_order?.[stall_key]?.[
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
                          orderDetails?.stall_order?.[stall_key]?.[
                            "items_ordered"
                          ]
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
                  <p>{orderDetails?.user_info?.email}</p>
                </li>
                {/* Phone Number */}
                {orderDetails?.user_info?.phoneNumber && (
                  <li
                    className={
                      styles.order_body_order_details_list_container_data
                    }
                  >
                    <h3 role={"heading"}>Phone Number</h3>
                    <p>{orderDetails?.user_info?.phoneNumber}</p>
                  </li>
                )}

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
