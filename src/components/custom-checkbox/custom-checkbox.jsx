import styles from "./custom-checkbox.module.scss";
import { useState } from "react";
import { BiCheck } from "react-icons/bi";

function CustomCheckbox({ label, leftSided }) {
  const [checked, setChecked] = useState(false);
  return (
    <div
      className={styles.option}
      onClick={() => {
        setChecked((prevState) => !prevState);
      }}
    >
      {leftSided && (
        <div
          className={`${styles.checkbox} ${checked ? styles.checked : ""}`}
          role="checkbox"
          aria-checked={checked}
        >
          <BiCheck className={`${styles.icon}`} />
        </div>
      )}
      <p>{label}</p>
      {!leftSided && (
        <div
          className={`${styles.checkbox} ${checked ? styles.checked : ""}`}
          role="checkbox"
          aria-checked={checked}
        >
          <BiCheck className={`${styles.icon}`} />
        </div>
      )}
    </div>
  );
}
export default CustomCheckbox;
