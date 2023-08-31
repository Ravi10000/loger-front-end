import styles from "./filter-option.module.scss";
import { useState } from "react";
import { BiCheck, BiRupee } from "react-icons/bi";

function FilterOption({ title = "", count = 0, isPrice = false }) {
  const [checked, setChecked] = useState(false);
  return (
    <div
      className={styles.option}
      onClick={() => {
        setChecked((prevState) => !prevState);
      }}
    >
      <div
        className={`${styles.checkbox} ${checked ? styles.checked : ""}`}
        role="checkbox"
        aria-checked={checked}
      >
        <BiCheck className={`${styles.icon}`} />
      </div>
      <div className={styles.details}>
        <div className={styles.optionText}>
          {isPrice && <BiRupee className={styles.rupee} />}
          <p>{title}</p>
        </div>
        <p>{`(${count})`}</p>
      </div>
    </div>
  );
}
export default FilterOption;
