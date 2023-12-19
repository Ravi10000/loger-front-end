import styles from "./filter-option.module.scss";
import { BiCheck, BiRupee } from "react-icons/bi";
import PropTypes from "prop-types";
FilterOption.propTypes = {
  title: PropTypes.string,
  // count: PropTypes.number,
  isPrice: PropTypes.bool,
  list: PropTypes.bool,
  checked: PropTypes.bool,
  setValue: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
  ]),
};

function FilterOption({
  title = "",
  // count = 0,
  isPrice = false,
  list = false,
  checked,
  setValue,
  value,
}) {
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
      <div className={styles.details}>
        <div className={styles.optionText}>
          {isPrice && <BiRupee className={styles.rupee} />}
          <p>{title}</p>
        </div>
        {/* <p>{`(${count})`}</p> */}
      </div>
    </div>
  );
}
export default FilterOption;
