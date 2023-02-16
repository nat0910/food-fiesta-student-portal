import MenuCard from "../../components/menu_page_component/menu_card";
import MenuShortcut from "../../components/menu_page_component/menu_shortcut";

import { useMenu } from "../../context/MenuContext";

export default function Menu() {
  const { menuList, hideStallMenu, cart, setCart, handleCart } = useMenu();

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
            return (
              <MenuCard
                key={index}
                stallItems={menuList[stall_key]}
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
