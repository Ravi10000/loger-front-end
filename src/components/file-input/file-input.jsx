import styles from "./file-input.module.scss";
import { useId } from "react";
import PropTypes from "prop-types";
import { IoCheckmarkDone } from "react-icons/io5";

FileInput.propTypes = {
  label: PropTypes.string,
  file: PropTypes.object,
  placeholder: PropTypes.string,
  register: PropTypes.func,
  error: PropTypes.string,
  defaultValue: PropTypes.string,
};

function FileInput({
  label,
  file,
  placeholder,
  register,
  error,
  defaultValue,
  ...otherProps
}) {
  const id = useId();
  if (file?.name) {
    const isNameLong = file?.name?.length > 25;
    placeholder = isNameLong ? file?.name?.substr(0, 25) + "..." : file?.name;
  } else if (defaultValue) {
    placeholder = defaultValue;
  }

  console.log({ placeholder, file, defaultValue });
  return (
    <div className={styles.fileInput}>
      <label htmlFor={id}>{label}</label>
      <div className={styles.inputContainer}>
        <input type="file" id={id} {...register} {...otherProps} />
        <p className={styles.placeholder}>{placeholder}</p>
        {defaultValue || file ? (
          <IoCheckmarkDone
            style={{ fontSize: "20px", color: "var(--main-brand-color)" }}
          />
        ) : (
          <img
            src="/images/icons/attach.svg"
            alt="attach"
            className={styles.icon}
          />
        )}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default FileInput;
