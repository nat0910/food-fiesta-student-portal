import styles from "./Error.module.scss";
import Page404 from "../../assets/images/Error_404.svg";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className={styles.error_grid}>
      <div className={styles.error_contianer}>
        <h1>404</h1>
        <p>Page Not Found</p>
        <div className={styles.error_img}>
          <img src={Page404} alt="" />
        </div>
        <Link to={"/"} className={styles.error_button}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
