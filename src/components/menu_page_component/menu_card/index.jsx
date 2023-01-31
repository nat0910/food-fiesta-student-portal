import { useRef } from "react";

import styles from "./MenuCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useMenu } from "../../../context/MenuContext";

export default function MenuCard({ stallItems, index, stall, hideStallMenu,cart, setCart , handleCart }) {


  const itemRef = useRef(null);
  const itemContRef = useRef(null);
  const itemListRef = useRef(null);

  function addtocart(e) {
    // if object related to the stall is not intialized intializes it
    if (cart[e.stall] === undefined) {
      Object.assign(cart, {
        [e.stall]: {
          items_ordered: {
            [e.item_id]: 1,
          },
        },
      });
    }
    // Handles addition of items to intialized stall object

    const { items_ordered } = cart[e.stall];
    const cartadd = {
      ...items_ordered,
      [e.item_id]: 1,
    };


    setCart({
      ...cart,
      [stall]: {
        items_ordered: cartadd,
      },
    });
  }

  // function handleCart(e, val, stall, item_id) {
  //   const { items_ordered } = cart[stall];

    
  //   // // checks if the button pressed is for increment or decrement
  //   const bool = e.target.id === "increment-button";
  //   val = bool ? val + 1 : val - 1;
    
  //   // // Item Quantity is less than zero it deletes the item from cart
  //   if (val === 0) {
  //     delete items_ordered[item_id];
  //     setCart({
  //       ...cart,
  //       [stall]: {
  //         items_ordered: items_ordered,
  //       },
  //     });
  //     return 0;
  //   }
    
  
  //   const cartChange = {
  //     ...items_ordered,[item_id] : val
  //   }

  //   setCart({
  //     ...cart,
  //     [stall]: {
  //       items_ordered: cartChange,
  //     },
  //   });
  // }

  

  function showhideList() {
    const cont = itemContRef.current;
    const listHeight = itemListRef?.current?.getBoundingClientRect().height;

    if (cont.style.height === "0px") {
      hideStallMenu();
      cont.style.height = `${listHeight}px`;
    } else {
      cont.style.height = "0px";
    }
  }

  return (
    <section id={index} className={styles.menu_card_container_}>
      <div
        className={styles.menu_card_container_header_}
        onClick={() => showhideList()}
      >
        <h2>{index}</h2>
        <div
          id="menu_list_toggle"
          className={styles.menu_card_container_lsit_toggle_}
        >
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
      </div>
      <div
        id={`stall-menu-list`}
        className={styles.menu_card_container_body}
        ref={itemContRef}
        style={{
          height: 0,
        }}
        title={`${stall}-list`}
      >
        <ul id={`${stall}-list`} ref={itemListRef}>
          {Object.keys(stallItems).map((item_id, index) => {
            return (
              <li
                key={index}
                className={styles.menu_item_details_container_}
                style={{
                  backgroundColor: stallItems[item_id]["availability"]
                    ? "transparent"
                    : "rgb(196, 196, 196,.25)",
                  textTransform: "capitalize",
                }}
              >
                <div className={styles.menu_item_details_content_}>
                  <div className={styles.menu_item_details_content_header_}>
                    <p role={"heading"}>{stallItems[item_id]["name"]}</p>
                    <p
                      style={{
                        marginTop: ".5rem",
                        letterSpacing: ".5px",
                      }}
                    >
                      {new Intl.NumberFormat("en-IN", {
                        currency: "INR",
                        style: "currency",
                      }).format(stallItems[item_id]["price"])}
                    </p>
                  </div>

                  {cart[stall]?.items_ordered[item_id] === undefined ||
                  cart[stall]?.items_ordered[item_id] === 0 ? (
                    <button
                      type={"button"}
                      id={"add-to-cart-button"}
                      className={
                        stallItems[item_id]["availability"]
                          ? styles.menu_item_details_content_button_add_
                          : styles.menu_item_details_content_button_add_disable_
                      }
                      onClick={() =>
                        addtocart({
                          stall,
                          item_id: item_id,
                          name: stallItems[item_id]["name"],
                          price: stallItems[item_id]["price"],
                        })
                      }
                      disabled={!stallItems[item_id]["availability"]}
                    >
                      {stallItems[item_id]["availability"]
                        ? "add"
                        : "out of stock"}
                    </button>
                  ) : (
                    <div
                      className={styles.menu_item_details_content_button_group_}
                    >
                      <button
                        type={"button"}
                        id="decrement-button"
                        onClick={(e) => {
                          handleCart(
                            e,
                            cart[stall]?.items_ordered[item_id],
                            stall,
                            item_id
                          );
                        }}
                      >
                        &#8722;
                      </button>
                      <p>{cart[stall]?.items_ordered[item_id]}</p>
                      <button
                        type={"button"}
                        id="increment-button"
                        onClick={(e) => {
                          handleCart(
                            e,
                            cart[stall]?.items_ordered[item_id],
                            stall,
                            item_id
                          );
                        }}
                      >
                        &#43;
                      </button>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
