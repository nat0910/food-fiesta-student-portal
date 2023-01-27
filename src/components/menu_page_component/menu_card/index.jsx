import React from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../utils/firebaseConfig";
import { useState } from "react";

import styles from "./MenuCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

export default function MenuCard({ index, showhideList }) {
  const [docsData, setDocsData] = useState(null);

  const menuDocRef = doc(db, "menu", "menu_items");

  async function handleMenu() {
    const result = await getDoc(menuDocRef);
    console.log(result);
  }
  // getDocs()

  async function handleMenuCollection() {
    const result = await getDocs(collection(db, "menu"));
    console.log(result);
  }

  return (
    <section id={`stall${index + 1}`} className={styles.menu_card_container_}>
      <div className={styles.menu_card_container_header_}>
        <h2>{`stall ${index + 1}`}</h2>
        <div
          id="menu_list_toggle"
          className={styles.menu_card_container_lsit_toggle_}
          onClick={() => showhideList()}
        >
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
      </div>
      <div id="stall-menu-list" className={styles.menu_card_container_body}>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </section>
  );
}
