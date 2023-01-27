import { useState } from "react";
import styles from "./MenuShortcut.module.scss";

export default function MenuShortcut({ data }) {
  const [shortcutShow, setShortcutShow] = useState(false);

  function handleMenuShortcut(e) {
    document.getElementById(e).scrollIntoView();
    if (
      document
        .getElementById("root")
        .contains(document.getElementById("bodyVeil"))
    ) {
      document
        .getElementById("root")
        .removeChild(document.getElementById("bodyVeil"));
      document.body.style.overflowY = "auto";
    }
    setShortcutShow(!shortcutShow);
  }

  function MenuShowHide() {
    if (
      document
        .getElementById("root")
        .contains(document.getElementById("bodyVeil"))
    ) {
      document
        .getElementById("root")
        .removeChild(document.getElementById("bodyVeil"));
      document.body.style.overflowY = "auto";
    } else {
      const bodyHider = document.createElement("div");
      bodyHider.id = "bodyVeil";
      document.getElementById("root").appendChild(bodyHider);
      document.body.style.overflowY = "hidden";
    }
    setShortcutShow(!shortcutShow);
  }

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
          // hidden={!shortcutShow}
        >
          <h3>Menu</h3>
          <ul
            className={styles.menushortcut_menu_item_list_container_}
            role={"menu"}
          >
            {Object.keys(data).map((item, index) => {
              return (
                <li
                  role={"menuitem"}
                  key={index}
                  className={styles.menushortcut_menu_item_list_item_wrapper_}
                  onClick={() => handleMenuShortcut(`stall${index + 1}`)}
                >
                  {`stall ${index + 1}`}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
