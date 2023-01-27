import { Suspense, useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";
import LoadingScreen from "../components/loading_screen";
import LogoAndProfile from "../components/LogoAndProfile";

import Navbar from "../components/navbar";

export default function SharedLayout() {
  return (
    <>
      <LogoAndProfile />
      <main id="main">
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      </main>
      <Navbar />
    </>
  );
}
