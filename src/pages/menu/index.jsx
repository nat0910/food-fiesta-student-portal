import { useState } from "react";
import MenuCard from "../../components/menu_page_component/menu_card";
import MenuShortcut from "../../components/menu_page_component/menu_shortcut";

import { useMenu } from "../../context/MenuContext";

export default function Menu() {
  const { menuList, hideStallMenu , cart, setCart ,handleCart } = useMenu();

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
                hideStallMenu={hideStallMenu}
                cart={cart}
                setCart={setCart}                
                handleCart={handleCart}
              />
            );
          })}
      </div>

      <MenuShortcut data={menuList} hideStallMenu={hideStallMenu} />
    </>
  );
}
