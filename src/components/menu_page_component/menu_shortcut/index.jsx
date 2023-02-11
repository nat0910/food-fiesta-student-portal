import { useEffect, useState } from "react";
import styles from "./MenuShortcut.module.scss";

export default function MenuShortcut({ data, hideStallMenu }) {
  const [shortcutShow, setShortcutShow] = useState(false);

  function handleMenuShortcut(e, val) {
    hideStallMenu();
    const listheight = document
      ?.getElementById(`${e}-list`)
      .getBoundingClientRect().height;
    document.getElementById(e).childNodes[1].style.height = `${listheight}px`;

    if (val > 5) {
      document.getElementById(`${e}-header`).scrollIntoView(false);
      MenuShowHide();
      return 0;
    }
    MenuShowHide();
    document.getElementById(`${e}-header`).scrollIntoView(true);
  }

  function MenuShowHide() {
    const element = document.getElementById("bodyVeil");

    if (element.style.display === "none") {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
    setShortcutShow(!shortcutShow);
  }

  function handleMenuOutside(e) {
    if (
      e.srcElement.id === "bodyVeil" ||
      e.srcElement.id.includes("primary-navigation") ||
      e.srcElement.className.includes("las") ||
      e.target.id === "home"
    ) {
      MenuShowHide();
    }
  }

  useEffect(() => {
    if (shortcutShow) {
      document.addEventListener("click", handleMenuOutside, true);
    }
    return () => {
      document.removeEventListener("click", handleMenuOutside, true);
    };
  }, [shortcutShow]);

  return (
    <div className={styles.menushortcut_container_layout_}>
      <div className={styles.menushortcut_content_container_}>
        <button
          role={"button"}
          className={styles.menushortcut_button_wrapper_}
          onClick={() => MenuShowHide()}
        >
          <i className="las la-utensils"></i>
          <span>{shortcutShow ? "close" : "menu"}</span>
        </button>
        <div
          role={"menu"}
          className={
            shortcutShow
              ? styles.menushortcut_menu_list_container_show
              : styles.menushortcut_menu_list_container_
          }
        >
          <h3>Menu</h3>
          <ul
            className={styles.menushortcut_menu_item_list_container_}
            role={"menu"}
          >
            {Object.keys(data)
              .sort(data.sortStable)
              .map((item, index) => {
                // Loop  for getting total number of items sold by stall
                const totalItems = () => {
                  let i = 0;
                  for (const key in data[item]) {
                    if (Object.hasOwnProperty.call(data[item], key)) {
                      const element = [data[item][key]].length;
                      i = i + element;
                    }
                  }
                  return i;
                };

                return (
                  <li
                    role={"menuitem"}
                    key={index}
                    className={styles.menushortcut_menu_item_list_item_wrapper_}
                    onClick={() => handleMenuShortcut(item, totalItems())}
                    id={`${item}-shortcut`}
                  >
                    <p>{item}</p>
                    <p>{totalItems()}</p>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}
