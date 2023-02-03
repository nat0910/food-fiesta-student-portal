import { useEffect } from "react";
import styles from "./Loading.module.scss";

export default function LoadingScreen() {
  return (
    <div className={styles.loading_grid_}>
      <div className={styles.loader_}></div>
    </div>
  );
}
