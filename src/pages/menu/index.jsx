import React from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import MenuCard from "../../components/menu_page_component/menu_card";
import MenuShortcut from "../../components/menu_page_component/menu_shortcut";

const dataDB = {
  stall2: {
    stall_name: "Mysore cafe",
    45: {
      name: "plain dosa",
      price: 35,
      availability: true,
    },
    67: {
      availability: true,
      price: 30,
      name: "wada sambar",
    },
  },
  stall1: {
    stall_name: "Shiv wada pav",
    stall_menu: [
      {
        availability: true,
        price: 15,
        name: "vada pav",
      },
      {
        name: "kanda bhaji",
        price: 20,
        availability: true,
      },
    ],
  },
};

const data = new Array({}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {});

export default function Menu() {
  function showhideList() {
    console.log("hello");
    const toggle = document.getElementById("menu_list_toggle");
    toggle.classList.add("menu_card_container_lsit_toggle_active");
    console.log(toggle);
  }

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: ".5rem",
        }}
      >
        {data.map((item, index) => {
          return (
            <MenuCard
              {...item}
              index={index}
              key={index}
              showhideList={showhideList}
            />
          );
        })}
      </div>
      <MenuShortcut data={data} />
    </>
  );
}
