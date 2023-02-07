import { useState } from "react";
import styles from "./MenuShortcut.module.scss";

export default function MenuShortcut({ data, hideStallMenu }) {
  const [shortcutShow, setShortcutShow] = useState(false);

  function handleMenuShortcut(e, val) {
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

    hideStallMenu();
    const listheight = document
      ?.getElementById(`${e}-list`)
      .getBoundingClientRect().height;
    document.getElementById(e).childNodes[1].style.height = `${listheight}px`;

    if (val > 5) {
      document.getElementById(`${e}-header`).scrollIntoView(false);
      setShortcutShow(!shortcutShow);

      return 0;
    }

    document.getElementById(`${e}-header`).scrollIntoView(true);

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
