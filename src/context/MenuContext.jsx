import { collection, doc, onSnapshot } from "firebase/firestore";

import { useState, createContext, useEffect, useContext } from "react";
import { getFirebase } from "../utils/firebaseConfig";

const MenuContext = createContext();

function MenuProvider({ children }) {
  const [menuList, setMenuList] = useState({});

  const [cart, setCart] = useState({});

  function hideStallMenu() {
    document?.querySelectorAll("#stall-menu-list").forEach((e) => {
      const open = e.style.height != "0px";
      if (open) {
        e.style.height = "0px";
      }
    });
  }

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

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <MenuContext.Provider value={{ menuList, cart, setCart, hideStallMenu }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}

export default MenuProvider;
