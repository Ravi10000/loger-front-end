import styles from "./custom-button.module.scss";
import { BiLoaderAlt } from "react-icons/bi";
import PropTypes from "prop-types";

CustomButton.propTypes = {
  children: PropTypes.node,
  outlined: PropTypes.bool,
  small: PropTypes.bool,
  danger: PropTypes.bool,
  cancel: PropTypes.bool,
  rounded: PropTypes.bool,
  fit: PropTypes.bool,
  isLoading: PropTypes.bool,
  customStyles: PropTypes.object,
};

function CustomButton({
  children,
  outlined,
  small,
  danger,
  cancel,
  rounded,
  fit,
  isLoading,
  customStyles,
  ...otherProps
}) {
  return (
    <button
      style={customStyles}
      className={`${styles.customButton} ${outlined && styles.outlined} ${
        danger && styles.danger
      } ${fit && styles.fit} ${small && styles.small} ${
        rounded && styles.rounded
      } ${cancel && styles.cancel}`}
      {...otherProps}
    >
      {children}
      {isLoading && <BiLoaderAlt className="__loader" />}
    </button>
  );
}

export default CustomButton;
