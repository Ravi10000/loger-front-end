import styles from "./custom-checkbox.module.scss";
import { useState } from "react";
import { BiCheck } from "react-icons/bi";

function CustomCheckbox({ label, leftSided, style, checked, setChecked }) {
  return (
    <div style={style} className={styles.option} onClick={setChecked}>
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
