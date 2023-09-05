import styles from "./file-input.module.scss";
import { useId } from "react";

function FileInput({ label, placeholder, ...otherProps }) {
  const id = useId();
  return (
    <div className={styles.fileInput}>
      <label htmlFor={id}>{label}</label>
      <div className={styles.inputContainer}>
        <input type="file" {...otherProps} id={id} />
        <p className={styles.placeholder}>{placeholder}</p>
        <img
          src="/images/icons/attach.svg"
          alt="attach"
          className={styles.icon}
        />
      </div>
    </div>
  );
}

export default FileInput;
