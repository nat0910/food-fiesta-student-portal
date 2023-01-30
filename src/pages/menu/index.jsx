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
import { useMenu } from "../../context/MenuContext";

export default function Menu() {
  // const [menu, setMenu] = useState({});

  // useEffect(() => {
  //   const MENU_DOC_ID = "menu_items";
  //   const MENU_COLLECTION_ID = "menu";
  //   const { firestore } = getFirebase();
  //   const menuCol = collection(firestore, MENU_COLLECTION_ID);
  //   const menuDoc = doc(menuCol, MENU_DOC_ID);
  //   const unsub = onSnapshot(menuDoc, (document) => {
  //     setMenu(document.data());
  //   });

  //   return () => {
  //     unsub();
  //   };
  // }, []);

  const { menuList } = useMenu();

  function showhideList() {
    console.log("hello");
    const toggle = document.getElementById("menu_list_toggle");
    toggle.classList.remove(toggle.classList[0]);
    toggle.classList.toggle(menu_card_container_lsit_toggle_active);
  }

  return (
    <>
      <div
        style={{
          position: "relative",
        }}
      >
        {Object.keys(menuList)
          .sort(menuList.sortStable)
          .map((stall_key, index) => {
            // console.log("stalls", menuList[stall_key], index);
            // console.log(stall_key);

            return (
              <MenuCard
                key={index}
                stallItems={menuList[stall_key]}
                index={stall_key}
                stall={`stall${index + 1}`}
                showhideList={showhideList}
              />
            );
          })}
      </div>

      <MenuShortcut data={menuList} />
    </>
  );
}
