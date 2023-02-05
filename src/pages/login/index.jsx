import React from "react";
import GoogleButton from "react-google-button";
import { useAuth } from "../../context/AuthContext";

import styles from "./Login.module.scss";

export default function Login() {
  const { handleGoogleLogin, user } = useAuth();

  return (
    <div className={styles.login_grid_}>
      <div className={styles.login_container_}>
        <h1 className={styles.login_heading_wrapper_}>
          Welcome to <span>Food&nbsp;Fiesta&nbsp;2023!</span>
        </h1>
        <GoogleButton
          onClick={() => handleGoogleLogin()}
          className={styles.login_google_button_}
        />
      </div>
    </div>
  );
}
