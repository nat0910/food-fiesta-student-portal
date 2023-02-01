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

export default function OrderHistory() {
  const [orderHistory, setOrderHistory] = useState([]);
  const { user } = useAuth();

  const { cart } = useMenu();

  console.log(cart);

  function submitOrder(params) {
    newOrder(cart).then(console.log("successfully added new order"));
  }

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
          console.log(doc.data());
          return (
            <li key={doc.data().order_id}>
              <div>{doc.data().order_id}</div>
              <div>{doc.data().order_placed_timestamp.seconds}</div>
              <div>{doc.data().user_info.name}</div>
            </li>
          );
        })}
      </ul>
      <button onClick={submitOrder}>NEW ORDER</button>
    </div>
  );
}
