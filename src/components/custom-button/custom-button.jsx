import styles from "./custom-button.module.scss";
import { BiLoaderAlt } from "react-icons/bi";

function CustomButton({
  children,
  outlined,
  small,
  danger,
  cancel,
  rounded,
  fit,
  isLoading,
  ...otherProps
}) {
  return (
    <button
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
