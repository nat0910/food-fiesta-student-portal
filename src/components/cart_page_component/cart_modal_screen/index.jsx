import { useNavigate } from "react-router-dom";
import styles from "./CartModal.module.scss";

export default function CartModalScreen({ msg, setModalOpen }) {
  const navigate = useNavigate();

  return (
    <div className={styles.cart_modal_grid_}>
      <div className={styles.cart_modal_container}>
        <p>{msg}</p>
        <div className={styles.cart_modal_container_button_group}>
          <button
            className={styles.cart_modal_container_button_group_add_another}
            onClick={() => {
              navigate("/");
              setModalOpen({
                open: false,
                msg: "",
              });
            }}
          >
            add another item
          </button>
          <button
            className={styles.cart_modal_container_button_group_continue_}
            onClick={() => {
              setModalOpen({
                open: false,
                msg: "",
              });
            }}
          >
            continue with checkout
          </button>
        </div>
      </div>
    </div>
  );
}
