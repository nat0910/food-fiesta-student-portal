import { collection, doc, onSnapshot } from "firebase/firestore";

import {
  useState,
  createContext,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { getFirebase } from "../utils/firebaseConfig";
import { useAuth } from "./AuthContext";

const MenuContext = createContext();

function MenuProvider({ children }) {
  const { user, handleSignOut } = useAuth();
  const [menuList, setMenuList] = useState({});

  const [modalOpen, setModalOpen] = useState({
    open: false,
    msg: "",
  });

  const getLocalStorage = () => {
    const cartData = localStorage.getItem("cartData");
    if (cartData) {
      return JSON.parse(cartData);
    } else {
      return {};
    }
  };

  const [cart, setCart] = useState(getLocalStorage());

  function hideStallMenu() {
    document?.querySelectorAll("#stall-menu-list").forEach((e) => {
      const open = e.style.height != "0px";
      if (open) {
        e.style.height = "0px";
      }
    });
  }

  const handleCart = useCallback(
    function (e, val, stall, item_id) {
      const bool = e.target.id === "increment-button";
      val = bool ? val + 1 : val - 1;

      if (val === 0) {
        delete cart[stall][item_id];

        setCart({
          ...cart,
          [stall]: {
            ...cart[stall],
          },
        });

        const boolDel = Object.keys(cart[stall]).length === 0;
        if (boolDel) {
          delete cart[stall];
          setCart({ ...cart });
        }

        return 0;
      }

      setCart({ ...cart, [stall]: { ...cart[stall], [item_id]: val } });
    },
    [cart]
  );

  useEffect(() => {
    if (Object.keys(cart).length !== 0) {
      localStorage.setItem("cartData", JSON.stringify(cart));
    }
    if (Object.keys(cart).length === 0) {
      localStorage.removeItem("cartData");
    }
  }, [cart]);

  useEffect(() => {
    const { firestore } = getFirebase();
    const MENU_DOC_ID = "menu_items";
    const MENU_COLLECTION_ID = "menu";
    const menuCol = collection(firestore, MENU_COLLECTION_ID);
    const menuDoc = doc(menuCol, MENU_DOC_ID);

    const unsubscribe = onSnapshot(menuDoc, (document) => {
      setMenuList(document.data());
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <MenuContext.Provider
      value={{
        menuList,
        cart,
        setCart,
        hideStallMenu,
        handleCart,
        modalOpen,
        setModalOpen,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}

export default MenuProvider;
