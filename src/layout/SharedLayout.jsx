import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import LoadingScreenFrenchFries from "../components/loading_screen_component/loading_screen_french_fries";
import LogoAndProfile from "../components/layout_component/LogoAndProfile";

import Navbar from "../components/layout_component/navbar";

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
