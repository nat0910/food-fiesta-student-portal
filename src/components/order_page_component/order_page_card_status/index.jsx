import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import styles from "./OrderStatus.module.scss";
import { useRef } from "react";

export default function OrderCardStatus({
  index,
  stallItems,
  stall,
  stallStatus,
}) {
  return (
    <li key={stall} className={styles.order_status_container}>
      <div className={styles.order_status_container_header_container}>
        <div className={styles.order_status_container_header}>
          <h3>{stall}</h3>
        </div>
        <div className={styles.order_status_container_body}>
          <span
            className={
              stallStatus === "paid"
                ? styles.payment_success_status
                : styles.payment_failure_status
            }
          >
            {stallStatus}
          </span>
        </div>
      </div>
    </li>
  );
}
