import { NavLink } from "react-router-dom";
import styles from "./NavbarMobile.module.scss";

import NavData from "../../../utils/data/NavbarData.json";
import { useMenu } from "../../../context/MenuContext";

export default function Navbar() {
  const { cart } = useMenu();

  let total = function () {
    let i = 0;
    Object.keys(cart).forEach((stall_key) => {
      const key = cart[stall_key];
      Object.keys(key).forEach((item_id) => {
        i = i + key[item_id];
      });
    });
    return i;
  };

  return (
    <nav id="primary-navigation">
      <ul className={styles.nav_container_} id="primary-navigation-ul">
        {NavData.map((item, index) => {
          return (
            <li
              key={index}
              className={styles.nav_link_wrapper_}
              name={item.label}
              id={item.label}
            >
              <NavLink
                to={item.url}
                className={({ isActive }) => {
                  return isActive ? styles.nav_link_wrapper_active_ : "";
                }}
              >
                <i
                  id={
                    item.label === "cart"
                      ? total() === 0
                        ? ""
                        : styles.cart_icon_
                      : ""
                  }
                  className={item.icon}
                  data-cart_total={item.label === "cart" ? total() : null}
                />
                <span id={item.label}>{item.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
