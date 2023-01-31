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

  function handleCart(e, val, stall, item_id) {
    const { items_ordered } = cart[stall];

    const bool = e.target.id === "increment-button";
    val = bool ? val + 1 : val - 1;

    if (val === 0) {
      delete items_ordered[item_id];

      setCart({
        ...cart,
        [stall]: {
          items_ordered: items_ordered,
        },
      });

      const bool = Object.keys(cart[stall]["items_ordered"]).length === 0;

      if (bool) {
        delete cart[stall];
        setCart({ ...cart });
      }

      return 0;
    }
    const cartChange = {
      ...items_ordered,
      [item_id]: val,
    };

    setCart({
      ...cart,
      [stall]: {
        items_ordered: cartChange,
      },
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

  useEffect(() => {
    console.count("handleCart invoke");
  }, []);

  return (
    <MenuContext.Provider
      value={{ menuList, cart, setCart, hideStallMenu, handleCart }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}

export default MenuProvider;
