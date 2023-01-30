import { collection, doc, onSnapshot } from "firebase/firestore";

import { useState, createContext, useEffect, useContext } from "react";
import { getFirebase } from "../utils/firebaseConfig";

const MenuContext = createContext();

function MenuProvider({ children }) {
  const [menuList, setMenuList] = useState({});

  const [cart, setCart] = useState({});

  useEffect(() => {
    const { firestore } = getFirebase();
    const MENU_DOC_ID = "menu_items";
    const MENU_COLLECTION_ID = "menu";
    const menuCol = collection(firestore, MENU_COLLECTION_ID);
    const menuDoc = doc(menuCol, MENU_DOC_ID);

    const unsubscribe = onSnapshot(menuDoc, (document) => {
      // console.log("Current data: ", document.data());
      setMenuList(document.data());
    });

    // const unsubscribe = () => {
    //   setMenuList({
    //     stall1: {
    //       23: {
    //         availability: false,
    //         name: "vada pav",
    //         price: 15,
    //       },
    //       24: {
    //         availability: true,
    //         name: "kanda bhaji",
    //         price: 35,
    //       },
    //     },
    //     stall2: {
    //       45: {
    //         name: "plain dosa",
    //         price: 35,
    //         availability: true,
    //       },
    //       67: {
    //         name: "wada sambar",
    //         availability: true,
    //         price: 30,
    //       },
    //     },
    //   });
    // };

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <MenuContext.Provider value={{ menuList, cart, setCart }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}

export default MenuProvider;
