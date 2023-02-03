import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import { useLayoutEffect } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { collection, doc, onSnapshot } from "firebase/firestore";

import styles from "./Order.module.scss";
import { getFirebase } from "../../utils/firebaseConfig";

export default function OrderPage() {
  const navigate = useNavigate();

  const [orderDetails, setOrderDetails] = useState({});

  const { id } = useParams();
  const { state } = useLocation();

  useEffect(() => {
    const { firestore } = getFirebase();
    const MENU_COLLECTION_ID = "orders";
    const MENU_DOC_ID = state.id;
    const menuCol = collection(firestore, MENU_COLLECTION_ID);
    const menuDoc = doc(menuCol, MENU_DOC_ID);

    const unsubscribe = onSnapshot(menuDoc, (document) => {
      console.log("Current data: ", document.data());
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
            <p>{`Order id ${id}`}</p>
          </div>
        </div>

        <article id="order-body" role={"main"}>
          <div
            role={"status"}
            className={styles.order_body_payment_status_container}
          >
            <p>
              Payment Status :{" "}
              <span
                className={
                  orderDetails.payment_status === "paid"
                    ? styles.payment_success_status
                    : styles.payment_failure_status
                }
              >
                {orderDetails.payment_status}
              </span>
            </p>
          </div>

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
            <p>{`Order id : ${id}`}</p>
          </div>

          <div className={styles.order_body_directing_text_container}>
            <h3>Proceed to the Payment Counter</h3>
          </div>
        </article>
      </article>
    </>
  );
}
