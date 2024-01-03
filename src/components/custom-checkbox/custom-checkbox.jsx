import styles from "./custom-checkbox.module.scss";
import { BiCheck } from "react-icons/bi";
import PropTypes from "prop-types";

CustomCheckbox.propTypes = {
  label: PropTypes.string,
  leftSided: PropTypes.bool,
  style: PropTypes.object,
  checked: PropTypes.bool,
  setChecked: PropTypes.func,
  disabled: PropTypes.bool,
};

function CustomCheckbox({
  label,
  leftSided,
  style,
  checked,
  setChecked,
  disabled,
}) {
  return (
    <div
      style={style}
      className={`${styles.option} ${
        !checked && disabled ? styles.disabled : ""
      }`}
      onClick={() => {
        if (disabled && !checked) return;
        setChecked();
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
