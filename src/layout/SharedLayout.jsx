import { Suspense, useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";
import LoadingScreen from "../components/loading_screen";

import Navbar from "../components/navbar";

export default function SharedLayout() {
  useLayoutEffect(() => {
    function layoutSetter() {
      const main = document.getElementById("main");
      const navHeight = document.getElementById("navbar").offsetHeight;
      // main.style.marginTop = `${navHeight}px`; //
      main.style.paddingTop = `${navHeight}px`;
    }

    if (document.readyState === "complete") {
      layoutSetter();
      console.log("hello");
    }

    window.addEventListener("load", layoutSetter);

    return () => {
      window.removeEventListener("load", layoutSetter);
    };
  }, []);

  return (
    <>
      <Navbar />
      <main id="main">
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}
