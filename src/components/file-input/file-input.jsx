import styles from "./file-input.module.scss";
import { useId } from "react";

function FileInput({
  label,
  file,
  placeholder,
  register,
  error,
  ...otherProps
}) {
  const id = useId();
  // file = file?.item(0)?.name;
  // console.log({ file });
  return (
    <div className={styles.fileInput}>
      <label htmlFor={id}>{label}</label>
      <div className={styles.inputContainer}>
        <input type="file" id={id} {...register} {...otherProps} />
        <p className={styles.placeholder}>
          {file?.item(0)?.name || placeholder}
        </p>
        <img
          src="/images/icons/attach.svg"
          alt="attach"
          className={styles.icon}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default FileInput;
