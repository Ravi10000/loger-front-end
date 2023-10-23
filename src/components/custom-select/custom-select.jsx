import styles from "./custom-select.module.scss";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

function CustomSelect({ selected, setSelected, list, onCountChange }) {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div
      className={styles.customSelect}
      onClick={() => setShowOptions((prevState) => !prevState)}
    >
      <div className={styles.selected}>
        <p>{selected}</p>
        <IoIosArrowDown
          className={`${styles.icon} ${showOptions ? styles.rotate : ""}`}
        />
      </div>
      {showOptions && (
        <ul className={styles.options}>
          {list.map((item) => (
            <li
              onClick={() => {
                // setSelected(item);
                onCountChange(parseInt(item));
              }}
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomSelect;
