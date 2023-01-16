import { getAuth } from "firebase/auth";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import SharedLayout from "./layout/SharedLayout";
import Cart from "./pages/cart";
import Error from "./pages/error";
import Menu from "./pages/menu";
import OrderHistory from "./pages/order_history";
// import { auth } from "./utils/firebaseConfig";

function App() {
  const [count, setCount] = useState(0);

  // console.log(auth);

  return (
    <Routes>
      <Route element={<SharedLayout />} path="/">
        <Route element={<Menu />} index />
        <Route element={<Cart />} path="cart" />
        <Route element={<OrderHistory />} path="past-orders" />
        <Route element={<Error />} path="*" />
      </Route>
    </Routes>
  );
}

export default App;
