import React from "react";
import { getFirebase } from "../../utils/firebaseConfig";
import { useAuth } from "../../context/AuthContext";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useOrder } from "../../context/OrderContext";

export default function OrderHistory() {
  const [orderHistory, setOrderHistory] = useState([]);
  const { user } = useAuth();

  const { orderHistoryData } = useOrder();

  return (
    <div>
      OrderHistory
      <ul>
        {orderHistoryData.map((doc, index) => {
          return (
            <li
              key={doc.order_id}
              style={{
                marginBottom: "2rem",
              }}
            >
              <div>{doc.order_id}</div>
              <div>{doc.order_placed_timestamp.seconds}</div>
              <div
                style={{
                  marginBottom: "1rem",
                }}
              >
                {doc.user_info.name}
              </div>

              <Link
                style={{
                  padding: "1rem",
                  backgroundColor: "red",
                  color: "white",
                }}
                to={`/your-orders/order-details/${doc?.id}`}
                state={{ id: doc?.id }}
              >
                Press To Reveal : {doc.order_id}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
