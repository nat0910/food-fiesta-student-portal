import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState, createContext } from "react";
import { getFirebase } from "../utils/firebaseConfig";
import { useAuth } from "./AuthContext";

import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
const OrderHistoryContext = createContext();

function OrderProvider({ children }) {
  const [orderHistoryData, setOrderHistoryData] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    const { firestore } = getFirebase();
    const ordersColRef = collection(firestore, "orders");

    const q = query(
      ordersColRef,
      where("user_info.uid", "==", `${user?.uid}`),
      orderBy("order_placed_timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {

        if (change.type === "modified") {
          toast(<Link to={`/your-orders/order-details/${change.doc.id}`}>
            #{change.doc.data().order_id} Order Status Updated!!
          </Link>, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
          console.log("UPDATED", change.doc.data())
        }
      });
      setOrderHistoryData(
        querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );
    });

    return () => {
      unsubscribe();
    };
  }, [user?.uid]);

  return (
    <OrderHistoryContext.Provider
      value={{
        orderHistoryData,
      }}
    >
      {children}
    </OrderHistoryContext.Provider>
  );
}
export function useOrder() {
  return useContext(OrderHistoryContext);
}

export default OrderProvider;
