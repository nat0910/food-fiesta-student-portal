import lottie from "lottie-web";
import { useEffect } from "react";
import styles from "./Loading.module.scss";

import FrenchFries from "../../utils/data/loading_french_fries.json";

export default function LoadingScreenFrenchFries() {
  useEffect(() => {
    const modalInstance = lottie.loadAnimation({
      animationData: FrenchFries,
      container: document.getElementById("lottie"),
      renderer: "svg",
      loop: true,
      autoplay: "true",
    });

    return () => modalInstance.destroy();
  }, []);

  return (
    <div className={styles.loading_grid_}>
      <div id="lottie"></div>
    </div>
  );
}
