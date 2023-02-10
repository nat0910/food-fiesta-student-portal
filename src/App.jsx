import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

// import pages

function wait(params) {
  return new Promise((resolve) => {
    setTimeout(resolve, params);
  });
}

import Login from "./pages/login";

const SharedLayout = lazy(() =>
  wait(500).then(() => import("./layout/SharedLayout"))
);
const Menu = lazy(() => wait(500).then(() => import("./pages/menu")));
const Cart = lazy(() => wait(500).then(() => import("./pages/cart")));
const Error = lazy(() => wait(500).then(() => import("./pages/error")));
const Order = lazy(() => wait(500).then(() => import("./pages/order")));
const OrderHistory = lazy(() =>
  wait(500).then(() => import("./pages/order_history"))
);
const LoginNumber = lazy(() =>
  wait(500).then(() => import("./pages/login_number"))
);

function App() {
  return (
    <Routes>
      <Route element={<SharedLayout />} path="/">
        <Route element={<Menu />} index />
        <Route element={<Cart />} path="cart" />
        <Route element={<OrderHistory />} path="your-orders" />
        <Route element={<Error />} path="*" />
      </Route>

      <Route element={<Order />} path="/your-orders/order-details/:id" />
      <Route element={<Login />} path="/login" />
      <Route element={<LoginNumber />} path="/login/number" />
    </Routes>
  );
}

export default App;
