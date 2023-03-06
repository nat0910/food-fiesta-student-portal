import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import styles from "./OrderUnpaid.module.scss";
import { useRef } from "react";

import StallNames from "../../../utils/data/stallNames.json";

export default function OrderCardUnpaid({ index, stallItems, stall }) {
  const orderContRef = useRef(null);
  const orderListRef = useRef(null);

  function total() {
    let i = 0;
    for (const key in stallItems) {
      if (Object.hasOwnProperty.call(stallItems, key)) {
        const element = stallItems[key];
        i = i + element.price * element.qty;
      }
    }
    return i;
  }

  function showhideList() {
    const cont = orderContRef.current;
    const listHeight = orderListRef?.current?.getBoundingClientRect().height;
    const toggleButton = document.getElementById(`${stall}-toggle`);

    if (cont.style.height === "0px") {
      toggleButton.style.rotate = "180deg";
      cont.style.height = `${listHeight}px`;
    } else {
      toggleButton.style.rotate = "0deg";
      cont.style.height = "0px";
    }
  }

  return (
    <li key={stall} className={styles.order_unpaid_container}>
      <div
        className={styles.order_unpaid_container_header_container}
        onClick={() => showhideList()}
      >
        <div className={styles.order_unpaid_container_header}>
          <h3>{StallNames?.[stall]?.["name"] || stall}</h3>
          <FontAwesomeIcon
            fixedWidth
            icon={faAngleDown}
            className={styles.order_unpaid_container_header_icon}
            id={`${stall}-toggle`}
          />
        </div>
        <p>
          {new Intl.NumberFormat("en-IN", {
            currency: "INR",
            style: "currency",
          }).format(total())}
        </p>
      </div>
      <div
        className={styles.order_unpaid_container_body_container}
        style={{
          height: "0px",
        }}
        ref={orderContRef}
      >
        <ul
          className={styles.order_unpaid_container_body_container_list}
          ref={orderListRef}
        >
          {Object?.keys(stallItems)?.map((item_key, index) => {
            return (
              <li key={item_key}>
                <div
                  className={
                    styles.order_unpaid_container_body_container_list_items
                  }
                >
                  {/* Item Name and Item Price */}
                  <div
                    className={
                      styles.order_unpaid_container_body_container_list_items_header
                    }
                  >
                    <p role={"heading"}>{stallItems[item_key]["name"]}</p>
                    <p>
                      {new Intl.NumberFormat("en-IN", {
                        currency: "INR",
                        style: "currency",
                      }).format(stallItems[item_key]["price"])}
                    </p>
                  </div>
                  {/* Item Quantity */}
                  <div
                    className={
                      styles.order_unpaid_container_body_container_list_items_quantity
                    }
                  >
                    <p>
                      x <span>{stallItems[item_key]["qty"]}</span>
                    </p>
                  </div>
                  {/* Item Quantity X  Item Price */}
                  <p
                    className={
                      styles.order_unpaid_container_body_container_list_items_total
                    }
                  >
                    {new Intl.NumberFormat("en-IN", {
                      currency: "INR",
                      style: "currency",
                    }).format(
                      stallItems[item_key]["price"] *
                        stallItems[item_key]["qty"]
                    )}
                  </p>
                </div>
              </li>
            );
          })}
          <li
            className={styles.order_unpaid_container_body_container_list_items}
            style={{
              borderTop: " 1px dashed rgb(196, 196, 196)",
              paddingTop: ".45rem",
              marginBottom: ".1rem",
            }}
          >
            <div
              className={
                styles.order_unpaid_container_body_container_list_items_header
              }
            >
              <p
                style={{
                  color: "black",
                  fontWeight: 600,
                }}
              >
                Subtotal
              </p>
            </div>
            <p>
              {new Intl.NumberFormat("en-IN", {
                currency: "INR",
                style: "currency",
              }).format(total())}
            </p>
          </li>
        </ul>
      </div>
    </li>
  );
}
