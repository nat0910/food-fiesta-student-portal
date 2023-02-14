import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from "./App";
import LoadingScreen from "./components/loading_screen_component/loading_screen";
import 'react-toastify/dist/ReactToastify.css';

import "./global.scss";
import Provider from "./utils/provider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <Suspense fallback={<LoadingScreen />}>
          <ToastContainer />
          <App />
        </Suspense>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
