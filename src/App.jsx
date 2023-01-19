import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

// import pages

// import SharedLayout from "./layout/SharedLayout";

function wait(params) {
  return new Promise((resolve) => {
    setTimeout(resolve, params);
  });
}

const SharedLayout = lazy(() =>
  wait(500).then(() => import("./layout/SharedLayout"))
);

const Menu = lazy(() => wait(500).then(() => import("./pages/menu")));
const Login = lazy(() => wait(500).then(() => import("./pages/login")));
const Cart = lazy(() => wait(500).then(() => import("./pages/cart")));
const Error = lazy(() => wait(500).then(() => import("./pages/error")));
const OrderHistory = lazy(() =>
  wait(500).then(() => import("./pages/order_history"))
);

function App() {
  return (
    <Routes>
      <Route element={<SharedLayout />} path="/">
        <Route element={<Menu />} index />
        <Route element={<Cart />} path="cart" />
        <Route element={<OrderHistory />} path="past-orders" />
        <Route element={<Error />} path="*" />
      </Route>

      <Route element={<Login />} path="/login" />
    </Routes>
  );
}

export default App;
