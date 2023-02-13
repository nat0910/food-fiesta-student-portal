import { useLayoutEffect, useRef, useState } from "react";
import styles from "./LoginNumber.module.scss";

import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFirebase } from "../../utils/firebaseConfig";
import { httpsCallable } from "firebase/functions";
import { useNavigate } from "react-router-dom";

const regex = new RegExp("[1-9]{1}[0-9]{9}");

export default function LoginNumber() {
  const TelRef = useRef(null);

  const [iserror, setIserror] = useState(false);

  const navigate = useNavigate();

  function updatePhone(phoneNumber) {
    const { functions } = getFirebase();
    const updatePhone = httpsCallable(functions, "updatePhone");
    updatePhone({ phoneNumber: phoneNumber }).then(() => {
      navigate("/");
    });
  }

  function handlePhoneNumber(e) {
    e.preventDefault();

    const val = TelRef?.current?.value;

    // "val" is the value from the input element

    if (regex?.test(val)) {
      setIserror(false);
      updatePhone(val);
    }
    if (!regex?.test(val)) {
      setIserror(true);
    }
  }

  useLayoutEffect(() => {
    const { auth } = getFirebase();

    auth?.currentUser?.getIdTokenResult().then((id_result) => {
      if (id_result?.claims?.phoneNumber !== undefined) {
        navigate("/");
      }
    });
    return () => {};
  }, []);

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
            minLength={8}
            maxLength={10}
            ref={TelRef}
            required
            autoComplete="off"
          />
          <label htmlFor="phoneNo" className={styles.login_number_input_label}>
            phone no.
          </label>
        </div>
        {iserror && (
          <div
            style={{
              fontSize: ".85em",
              marginTop: ".35rem",
              color: "red",
              fontWeight: 500,
            }}
          >
            <p className="text-danger">* Please enter your whatsapp number.</p>
          </div>
        )}
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
