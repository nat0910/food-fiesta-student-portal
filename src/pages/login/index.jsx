import React from "react";
import GoogleButton from "react-google-button";
import { useAuth } from "../../context/AuthContext";

import styles from "./Login.module.scss";

export default function Login() {
  const { handleGoogleLogin } = useAuth();

  return (
    <div className={styles.login_grid_}>
      <div className={styles.login_container_}>
        <h1 className={styles.login_heading_wrapper_}>
          Welcome to <span>Zaika!</span>
        </h1>
        <p
          style={{
            textAlign: "center",
          }}
        >
          Food ordering app for Food Fiesta 2023. No more waiting in line to
          order your food.
        </p>
        <GoogleButton
          onClick={() => handleGoogleLogin()}
          className={styles.login_google_button_}
        />
      </div>
    </div>
  );
}
