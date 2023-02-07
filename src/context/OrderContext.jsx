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

const OrderHistoryContext = createContext();

function OrderProvider({ children }) {
  const [orderHistoryData, setOrderHistoryData] = useState([]);

  const { user } = useAuth();

  useEffect(() => {

    if (!user) {
      return () => {
        console.log("no user , menu context");
      }
    }
    const { firestore } = getFirebase();
    const ordersColRef = collection(firestore, "orders");

    const q = query(
      ordersColRef,
      where("user_info.uid", "==", `${user?.uid}`),
      orderBy("order_placed_timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
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
