import { useRef } from "react";
import styles from "./LoginNumber.module.scss";

import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFirebase } from "../../utils/firebaseConfig";

export default function LoginNumber() {
  const TelRef = useRef(null);

  function updatePhone(phone_number) {
    const { functions } = getFirebase()

    const updatePhone = httpsCallable(functions, "updatePhone");
    updatePhone({ phone_number: phone_number });
  }

  function handlePhoneNumber(e) {
    e.preventDefault();

    const val = TelRef?.current?.value;
    // "val" is the value from the input element
    updatePhone(val);
  }

  return (
    <div className={styles.login_number_grid}>
      <form method="post">
        <div className={styles.login_number_input_header}>
          <h1>Enter your mobile number</h1>
          <p>So that we can contact you in case of something </p>
        </div>
        <div className={styles.login_number_input_group}>
          <input
            className={styles.login_number_input_}
            type="tel"
            name="phoneNo"
            id="phoneNo"
            maxLength={10}
            ref={TelRef}
            required
            autoComplete="off"
          />
          <label htmlFor="phoneNo" className={styles.login_number_input_label}>
            phone no.
          </label>
        </div>
        <button
          type="submit"
          className={styles.login_number_input_button}
          onClick={(e) => handlePhoneNumber(e)}
        >
          <FontAwesomeIcon fixedWidth icon={faArrowRightLong} />
        </button>
      </form>
    </div>
  );
}
