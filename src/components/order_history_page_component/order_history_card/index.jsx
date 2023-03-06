import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";
import styles from "./OrderHistoryCard.module.scss";

import StallNames from "../../../utils/data/stallNames.json";

export default function OrderHistoryCard({ data }) {
  function getOrderDate(val) {
    const date = new Date(val);
    const year = date.getFullYear();
    const month = date.toLocaleDateString("default", {
      month: "long",
    });
    const day = date.getDate();
    const time = date.toLocaleTimeString();

    return `${month} ${day}, ${year} @ ${time}`;
  }

  function grand_total() {
    let grand_total = 0;
    for (const stall_key in data?.["stall_order"]) {
      const stall_key_obj = data["stall_order"][stall_key]["items_ordered"];
      for (const item_key in stall_key_obj) {
        if (Object.hasOwnProperty.call(stall_key_obj, item_key)) {
          const element = stall_key_obj[item_key];
          grand_total = grand_total + element["price"] * element["qty"];
        }
      }
    }
    return grand_total;
  }

  function servedStatus() {
    const array = new Array();
    for (const stall_key in data?.stall_order) {
      const element = data?.stall_order[stall_key]?.status;
      array.push(element);
    }

    const allEqual = (arr) => arr.every((val) => val === "served");

    return allEqual(array);
  }

  function refundedStatus() {
    const array = new Array();
    for (const stall_key in data?.stall_order) {
      const element = data?.stall_order[stall_key]?.status;
      array.push(element);
    }

    if (array.includes("refunded")) {
      const filArray = array.filter((status) => status !== "refunded");
      const allEqual = (arr) => arr.every((val) => val === "served");
      return filArray.length !== 0 ? allEqual(filArray) && true : true;
    }
    const allEqual = (arr) => arr.every((val) => val === "served");

    return allEqual(array);
  }

  function refundInitiated() {
    const array = [];
    for (const stall_key in data?.stall_order) {
      const element = data?.stall_order[stall_key]?.status;
      array.push(element);
    }

    const bool = array.includes("cancelled");

    return bool;
  }

  function shortData() {
    let array = [];
    for (const stall_key in data?.stall_order) {
      const element = data?.stall_order[stall_key]?.["items_ordered"];
      Object.keys(element)
        .slice(0, 1)
        .map((item_key) => {
          const result = {
            stall_key: stall_key,
            stall_data: element?.[Object.keys(element)[0]],
          };
          array.push(result);
        });
    }
    return array;
  }

  const totalItems = () => {
    let i = 0;
    for (const stall_key in data?.stall_order) {
      const element = data?.stall_order[stall_key]["items_ordered"];

      i = i + Object.keys(data?.stall_order[stall_key]["items_ordered"]).length;
    }
    return i;
  };

  // console.log(data?.order_id, refundInitiated());

  return (
    <section key={data.id} className={styles.order_history_cart_}>
      <div className={styles.order_history_cart_container}>
        <div
          className={styles.order_history_cart_container_header}
          role={"heading"}
        >
          <div className={styles.order_history_cart_container_header_content}>
            <h2>
              Order Id : <span>{data?.order_id}</span>
            </h2>
            <p>
              <span>
                {getOrderDate(data?.order_placed_timestamp?.toDate())}
              </span>
            </p>
          </div>
          <div
            className={
              styles.order_history_cart_container_header_content_status
            }
          >
            {data?.payment_status === "unpaid" ? (
              <span className={styles.payment_failure_status}>Unpaid</span>
            ) : servedStatus() || refundedStatus() ? (
              <span className={styles.payment_completed_status}>
                Completed
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  style={{
                    marginLeft: ".25rem",
                    color: "green",
                  }}
                />
              </span>
            ) : (
              <span className={styles.payment_inprogress_status}>
                Inprogress
              </span>
            )}
          </div>
        </div>
        <div className={styles.order_history_cart_containe_body}>
          <ul>
            {Object.keys(shortData())
              .slice(0, 2)
              .sort(shortData()?.sortStable)
              .map((item_key) => {
                return (
                  <li key={shortData()?.[item_key]?.stall_key}>
                    <p
                      className={
                        styles.order_history_cart_containe_body_stall_key
                      }
                    >
                      {StallNames[shortData()?.[item_key]?.stall_key]["name"]}
                    </p>
                    <div
                      className={
                        styles.order_history_cart_containe_body_container
                      }
                    >
                      <div
                        className={
                          styles.order_history_cart_containe_body_header
                        }
                      >
                        <p role={"heading"}>
                          {shortData()?.[item_key]?.stall_data?.name}
                        </p>
                        <p>
                          {new Intl.NumberFormat("en-IN", {
                            currency: "INR",
                            style: "currency",
                          }).format(shortData()?.[item_key]?.stall_data?.price)}
                        </p>
                      </div>

                      <div>
                        <p>
                          x{" "}
                          <span>
                            {shortData()?.[item_key]?.stall_data?.["qty"]}
                          </span>
                        </p>
                      </div>

                      <p
                        className={
                          styles.order_unpaid_container_body_container_list_items_total
                        }
                      >
                        {new Intl.NumberFormat("en-IN", {
                          currency: "INR",
                          style: "currency",
                        }).format(
                          shortData()?.[item_key]?.stall_data?.["price"] *
                            shortData()?.[item_key]?.stall_data?.["qty"]
                        )}
                      </p>
                    </div>
                  </li>
                );
              })}
            {totalItems() > 1 && (
              <li
                className={styles.order_history_cart_containe_body_items_number}
              >
                <p>
                  {totalItems() === 2
                    ? `+ ${totalItems() - 1} items`
                    : `+ ${totalItems() - 2} items`}
                </p>
              </li>
            )}
          </ul>
        </div>
        <div className={styles.order_history_cart_containe_footer}>
          <div className={styles.order_history_cart_containe_footer_content}>
            <h3>
              {new Intl.NumberFormat("en-IN", {
                currency: "INR",
                style: "currency",
              }).format(grand_total())}
            </h3>
            <p>total</p>
          </div>

          <div
            className={styles.order_history_cart_container_footer_view_details}
          >
            <Link to={`/your-orders/order-details/${data?.id}`}>
              View Details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
