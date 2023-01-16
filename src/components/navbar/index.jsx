import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

//importing stylesheet
import styles from "./Navbar.module.scss";

//importing icons and images
import LogoImage from "../../assets/images/e_cell_logo_BLACK.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCartShopping,
  faClockRotateLeft,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  // const [windowWidth, setWindowWidth] = useState(false);
  const [toggleLinks, setToggleLinks] = useState(false);

  const navRef = useRef(null);
  const headerRef = useRef(null);

  // useLayoutEffect(() => {
  //   const result = window.innerWidth < 1280;
  //   setWindowWidth(result);
  // }, []);

  /* ------ HANDLES NAVIGATION TOGGLE FOR MOBILE ------ */

  useEffect(() => {
    navRef.current.style.top = `${
      headerRef.current.getBoundingClientRect().height
    }px`;

    navRef.current.style.height = `${
      window.innerHeight - headerRef.current.getBoundingClientRect().height
    }px`;

    if (toggleLinks) {
      navRef.current.style.right = `0px`;
      navRef.current.style.opacity = 1;
    } else {
      navRef.current.style.right = `-${
        headerRef.current.getBoundingClientRect().width
      }px`;
      navRef.current.style.opacity = 0;
    }
  }, [toggleLinks]);

  return (
    <header role={"navigation"} id="navbar" ref={headerRef}>
      <div className={styles.header_container}>
        <div className={styles.nav_logo_wrapper}>
          <img src={LogoImage} alt="" />
        </div>
        <nav className={styles.nav_links_container} ref={navRef}>
          <ul className={styles.nav_link_list_container}>
            <li className={styles.nav_link_list_container_li_wrapper_}>
              <NavLink
                style={({ isActive }) => {
                  return {
                    color: isActive ? "#000" : "inherit",
                  };
                }}
                to="/"
                onClick={() => setToggleLinks(!toggleLinks)}
              >
                <FontAwesomeIcon
                  fixedWidth
                  icon={faUtensils}
                  className={styles.nav_link_list_container_li_wrapper_a_icon_}
                />
                <span
                  className={styles.nav_link_list_container_li_wrapper_a_text_}
                >
                  menu
                </span>
              </NavLink>
            </li>
            <li className={styles.nav_link_list_container_li_wrapper_}>
              <NavLink
                style={({ isActive }) => {
                  return {
                    color: isActive ? "#000" : "inherit",
                  };
                }}
                onClick={() => setToggleLinks(!toggleLinks)}
                to="/cart"
              >
                <FontAwesomeIcon fixedWidth icon={faCartShopping} />
                <span
                  className={styles.nav_link_list_container_li_wrapper_a_text_}
                >
                  Cart
                </span>
              </NavLink>
            </li>
            <li className={styles.nav_link_list_container_li_wrapper_}>
              <NavLink
                style={({ isActive }) => {
                  return {
                    color: isActive ? "#000" : "inherit",
                  };
                }}
                onClick={() => setToggleLinks(!toggleLinks)}
                to="/past-orders"
              >
                <FontAwesomeIcon fixedWidth icon={faClockRotateLeft} />
                <span
                  className={styles.nav_link_list_container_li_wrapper_a_text_}
                >
                  past order
                </span>
              </NavLink>
            </li>
            <li
              className={styles.nav_link_list_container_li_wrapper_last_child}
            >
              <a
                className={styles.nav_logout_wrapper}
                onClick={() => {
                  setToggleLinks(!toggleLinks);
                  console.log("logged out");
                }}
              >
                <FontAwesomeIcon
                  fixedWidth
                  icon={faArrowRightFromBracket}
                  style={{
                    marginRight: ".7rem",
                  }}
                />
                Sign Out
              </a>
            </li>
          </ul>
        </nav>
        {/* Mobile View and Desktop setup */}
        {/* 
        {!windowWidth && (
          <a
            className={styles.nav_logout_wrapper}
            onClick={() => console.log("logged out")}
          >
            <FontAwesomeIcon
              fixedWidth
              icon={faArrowRightFromBracket}
              style={{
                marginRight: ".5rem",
              }}
            />
            Sign Out
          </a>
        )} */}
        <div
          className={styles.nav_link_toggle_button}
          onClick={() => setToggleLinks(!toggleLinks)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
}
