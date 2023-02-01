import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import styles from "./LogoAndProfile.module.scss";

import FFlogo from "../../assets/images/FF_logo_.png";
import DefaultImage from "../../assets/images/default_profile_image.webp";

export default function LogoAndProfile() {
  const { user, handleSignOut } = useAuth();

  const [details, setDetails] = useState(false);
  const detailsRef = useRef(null);

  function handleOutsideClick(e) {
    if (e.target.innerText !== "Sign out") {
      if (detailsRef.current && !detailsRef.current.contains(e.target)) {
        setDetails(false);
      }
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, true);

    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, [details]);

  return (
    <header id="header">
      <div className={styles.header_container_}>
        <div className={styles.header_logo_wrapper_}>
          <img src={FFlogo} alt="food-fiesta-logo" />
        </div>
        <div className={styles.header_profile_container_}>
          <img
            src={user?.photoURL || DefaultImage}
            alt={user?.displayName}
            ref={detailsRef}
            onClick={() => setDetails(!details)}
          />
          {details && (
            <div className={styles.header_profile_container_content_}>
              <div className={styles.header_profile_details_container_}>
                <div
                  className={
                    styles.header_profile_details_container_img_wrapper
                  }
                >
                  <img
                    src={user?.photoURL || DefaultImage}
                    alt={user?.displayName}
                  />
                </div>
                <div
                  className={
                    styles.header_profile_details_container_content_wrapper
                  }
                >
                  <p>{user?.displayName}</p>
                  <p>{user?.email}</p>
                </div>
              </div>
              <button
                className={styles.header_profile_logout}
                onClick={() => handleSignOut()}
              >
                <FontAwesomeIcon fixedWidth icon={faArrowRightFromBracket} />
                <span onClick={() => handleSignOut()}>Sign out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
