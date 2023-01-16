import React, { useLayoutEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

export default function SharedLayout() {
  useLayoutEffect(() => {
    function layoutSetter() {
      const main = document.getElementById("main");
      const navHeight = document.getElementById("navbar").offsetHeight;
      main.style.marginTop = `${navHeight}px`;
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
        <Outlet />
      </main>
    </>
  );
}
