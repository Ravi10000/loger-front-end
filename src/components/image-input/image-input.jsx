import styles from "./image-input.module.scss";
import { IoIosAddCircle } from "react-icons/io";
import { useId } from "react";
import { MdCancel } from "react-icons/md";
import { HiCamera } from "react-icons/hi";

function ImageInput({
  label,
  image,
  placeholder,
  error,
  register,
  removeImage,
  profile,
  src,
  ...otherProps
}) {
  const id = useId();
  console.log({ src });
  return (
    <div className={`${styles.fileInput} ${profile ? styles.profile : ""}`}>
      {label && <label htmlFor={id}>{label}</label>}
      <div
        className={styles.inputContainer}
        style={{
          ...((image || src) && {
            backgroundImage: src
              ? `url("${import.meta.env.VITE_SERVER_URL}/images/${src}")`
              : `url("${URL.createObjectURL(image)}")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundColor: "transparent",
          }),
        }}
      >
        {image && (
          <MdCancel onClick={removeImage} className={styles.removeIcon} />
        )}
        <input
          type="file"
          id={id}
          disabled={image && !profile ? true : false}
          {...register}
          {...otherProps}
        />
        {!image && !profile && <IoIosAddCircle className={styles.icon} />}
        {profile && <HiCamera className={styles.icon} />}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default ImageInput;
