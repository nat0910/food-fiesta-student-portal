import React from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useState } from "react";
import { getFirebase } from "../../../utils/firebaseConfig";

import styles from "./MenuCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

export default function MenuCard({ stallItems, index, showhideList }) {
  const [docsData, setDocsData] = useState(null);
  const { firestore } = getFirebase();
  const menuDocRef = doc(firestore, "menu", "menu_items");

  async function handleMenu() {
    const result = await getDoc(menuDocRef);
    console.log(result);
  }
  // getDocs()

  async function handleMenuCollection() {
    const result = await getDocs(collection(firestore, "menu"));
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
          {Object.keys(stallItems).map((item_id, index) => {
            console.log("items", stallItems[item_id], index);
            return (
              <>
              <li>Price: {stallItems[item_id]['price']}</li>
              <li>Name: {stallItems[item_id]['name']}</li>
              <li>Availability: {stallItems[item_id]['availability'] ? <>True</>:<>False</>}</li>
              </>
            )
          })}
        </ul>
      </div>
    </section>
  );
}
