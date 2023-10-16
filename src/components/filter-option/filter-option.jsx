import styles from "./filter-option.module.scss";
import { useState } from "react";
import { BiCheck, BiRupee } from "react-icons/bi";

function FilterOption({
  title = "",
  count = 0,
  isPrice = false,
  list = false,
  checked,
  setValue,
  value,
}) {
  // const [checked, setChecked] = useState(false);
  return (
    <div
      className={styles.option}
      onClick={() => {
        setValue((prevValue) => {
          if (list) {
            if (prevValue?.includes(value))
              return prevValue?.filter((val) => val !== value);
            else return [...prevValue, value];
          }
          if (prevValue?.min === value?.min) return null;
          else return value;
        });
      }}
    >
      <div
        className={`${styles.checkbox} ${checked ? styles.checked : ""}`}
        role="checkbox"
        aria-checked={checked}
      >
        <BiCheck className={`${styles.icon}`} />
      </div>
      {/* <input type="checkbox" style={{ accentColor: "black" }} /> */}
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
