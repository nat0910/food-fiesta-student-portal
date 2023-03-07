import MenuCard from "../../components/menu_page_component/menu_card";
import MenuShortcut from "../../components/menu_page_component/menu_shortcut";
import LoadingScreenFrenchFries from "../../components/loading_screen_component/loading_screen_french_fries";

import { useMenu } from "../../context/MenuContext";

export default function Menu() {
  const { menuList, hideStallMenu, cart, setCart, handleCart } = useMenu();

  return Object.keys(menuList).length === 0 ? (
    <LoadingScreenFrenchFries />
  ) : (
    <>
      <div
        style={{
          position: "relative",
        }}
      >
        {Object.keys(menuList)
          .sort(menuList.sortStable)
          .map((stall_key, index) => {
            return (
              <MenuCard
                key={index}
                stallItems={menuList?.[stall_key]}
                index={stall_key}
                stall={stall_key}
                hideStallMenu={hideStallMenu}
                cart={cart}
                setCart={setCart}
                handleCart={handleCart}
              />
            );
          })}
      </div>
      <div
        id="bodyVeil"
        style={{
          display: "none",
        }}
      ></div>
      <MenuShortcut data={menuList} hideStallMenu={hideStallMenu} />
    </>
  );
}
