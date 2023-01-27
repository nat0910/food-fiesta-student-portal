import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import MenuCard from "../../components/menu_page_component/menu_card";
import MenuShortcut from "../../components/menu_page_component/menu_shortcut";
import { getFirebase } from "../../utils/firebaseConfig";
import {
  getFirestore,
  connectFirestoreEmulator,
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  addDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

export default function Menu() {
  const [menu, setMenu] = useState({});

  useEffect(() => {
    const MENU_DOC_ID = "menu_items";
    const MENU_COLLECTION_ID = "menu";
    const { firestore } = getFirebase();
    const menuCol = collection(firestore, MENU_COLLECTION_ID);
    const menuDoc = doc(menuCol, MENU_DOC_ID);
    const unsub = onSnapshot(menuDoc, (document) => {
      setMenu(document.data());
      console.log("Current data: ", document.data());
      console.log("Current data: ", Object.keys(menu));
    });

    return () => {
      unsub();
    };
  }, []);

  function showhideList() {
    console.log("hello");
    const toggle = document.getElementById("menu_list_toggle");
    toggle.classList.add("menu_card_container_lsit_toggle_active");
    console.log(toggle);
  }
  
  return (
    <>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: ".5rem",
        }}
      >
        {Object.keys(menu).map((stall_key, index) => {
          console.log("stalls", menu[stall_key] , index);
          return (
            <MenuCard
              stallItems={menu[stall_key]}
              index={index}
              key={index}
              showhideList={showhideList}
            />
          );
        })}
      </div>

      <MenuShortcut data={menu} />
    </>
  );
}
