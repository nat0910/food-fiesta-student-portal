import { NavLink } from "react-router-dom";
import styles from "./NavbarMobile.module.scss";

import NavData from "../../utils/data/NavbarData.json";

export default function Navbar() {
  return (
    <nav>
      <ul className={styles.nav_container_}>
        {NavData.map((item, index) => {
          return (
            <li key={index} className={styles.nav_link_wrapper_}>
              <NavLink
                to={item.url}
                className={({ isActive }) => {
                  return isActive ? styles.nav_link_wrapper_active_ : "";
                }}
              >
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
