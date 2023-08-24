import styles from "./submit-number-form.module.scss";
import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

function SubmitPhoneForm() {
  const [phone, setPhone] = useState();
  return (
    <form className={styles.submitPhoneForm}>
      <div className={styles.inputContainer}>
        <PhoneInput
          placeholder="9999990000"
          defaultCountry="IN"
          value={phone}
          onChange={setPhone}
        />
      </div>
      <button>Get the Link</button>
    </form>
  );
}

export default SubmitPhoneForm;
