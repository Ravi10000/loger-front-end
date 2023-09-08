import styles from "./settings.module.scss";
import CustomButton from "#components/custom-button/custom-button";
import CustomInput from "#components/custom-input/custom-input";
import { useState } from "react";
function Settings() {
  const [showNotification, setShowNotification] = useState(false);
  return (
    <div className={styles.settings}>
      <div className={styles.inputGroup}>
        <CustomInput bold label="Currency" placeholder="Rs. Indian rupee" />
        <CustomInput bold label="Language" placeholder="American English" />
      </div>
      <div
        className={styles.notificationContainer}
        onClick={() => setShowNotification((prevState) => !prevState)}
      >
        <h4>Notifications</h4>
        <div className={styles.notificationToggler}>
          <p>Notifications</p>
          <div
            className={`${styles.toggler} ${
              showNotification ? styles.active : ""
            }`}
          ></div>
        </div>
      </div>
      <CustomButton>Save</CustomButton>
    </div>
  );
}

export default Settings;
