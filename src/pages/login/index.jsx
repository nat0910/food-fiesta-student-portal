import GoogleButton from "react-google-button";
import { useAuth } from "../../context/AuthContext";

import styles from "./Login.module.scss";

import Banner450w from "../../assets/images/login/Frame-450w.png";
import Banner900w from "../../assets/images/login/Frame-900w.png";
import Banner1280w from "../../assets/images/login/Frame-1280w.png";
import Banner1450w from "../../assets/images/login/Frame-1450w.png";

// export default function Login() {
//   const { handleGoogleLogin } = useAuth();

//   return (
//     <div className={styles.login_grid_}>
//       <div className={styles.login_container_}>
//         <h1 className={styles.login_heading_wrapper_}>
//           Welcome to <span>Zaika!</span>
//         </h1>
//         <p
//           style={{
//             textAlign: "center",
//           }}
//         >
//           Food ordering app for Food Fiesta 2023. No more waiting in line to
//           order your food.
//         </p>

//       </div>
//     </div>
//   );
// }

export default function Login() {
  const { handleGoogleLogin } = useAuth();
  return (
    <>
      <div className={styles.login_layout}>
        <div className={styles.login_banner_container}>
          <img
            src={
              (window.innerWidth > 1280 && Banner1450w) ||
              (window.innerWidth < 1280 &&
                window.innerWidth > 825 &&
                Banner1280w) ||
              (window.innerWidth > 475 && Banner900w) ||
              (window.innerWidth < 475 && Banner450w)
            }
            alt=""
          />
        </div>
        <div className={styles.login_google_button_wrapper}>
          <GoogleButton
            onClick={() => handleGoogleLogin()}
            className={styles.login_google_button_}
          />
        </div>
      </div>
    </>
  );
}
