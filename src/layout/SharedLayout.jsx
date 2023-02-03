import { Suspense, useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";
import LoadingScreenFrenchFries from "../components/loading_screen_french_fries";
import LogoAndProfile from "../components/LogoAndProfile";

import Navbar from "../components/navbar";

export default function SharedLayout() {
  return (
    <>
      <LogoAndProfile />
      <main id="main">
        <Suspense fallback={<LoadingScreenFrenchFries />}>
          <Outlet />
        </Suspense>
      </main>
      <Navbar />
    </>
  );
}
