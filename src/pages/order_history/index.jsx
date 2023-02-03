import React from "react";
import { getFirebase, newOrder } from "../../utils/firebaseConfig";
import { useAuth } from "../../context/AuthContext";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  Query,
} from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { useMenu } from "../../context/MenuContext";
import { Link, NavLink } from "react-router-dom";

export default function OrderHistory() {
  const [orderHistory, setOrderHistory] = useState([]);
  const { user } = useAuth();

  const { cart } = useMenu();

  function submitOrder() {
    newOrder(cart).then(console.log("successfully added new order"));
  }

  function getOrderDetails() {}

  useEffect(() => {
    const { firestore } = getFirebase();
    const ordersColRef = collection(firestore, "orders");
    // Create a query against the collection.
    const q = query(
      ordersColRef,
      where("user_info.uid", "==", user?.uid),
      orderBy("order_placed_timestamp", "desc")
    );
    getDocs(q).then((querySnapshot) => {
      setOrderHistory(querySnapshot);
    });

    return () => {};
  }, []);

  return (
    <div>
      OrderHistory
      <ul>
        {orderHistory.docs?.map((doc) => {
          return (
            <li
              key={doc.data().order_id}
              style={{
                marginBottom: "2rem",
              }}
            >
              <div>{doc.data().order_id}</div>
              <div>{doc.data().order_placed_timestamp.seconds}</div>
              <div
                style={{
                  marginBottom: "1rem",
                }}
              >
                {doc.data().user_info.name}
              </div>

              <Link
                style={{
                  padding: "1rem",
                  backgroundColor: "red",
                  color: "white",
                }}
                to={`/your-orders/order-details/${doc.data().order_id}`}
                state={doc.data()}
              >
                Press To Reveal : {doc.data().order_id}
              </Link>
            </li>
          );
        })}
      </ul>
      <button onClick={() => submitOrder}>NEW ORDER</button>
    </div>
  );
}
