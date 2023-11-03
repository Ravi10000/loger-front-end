import styles from "./image-input.module.scss";
import { IoIosAddCircle } from "react-icons/io";
import { useId } from "react";
import { MdCancel } from "react-icons/md";

function ImageInput({
  label,
  image,
  placeholder,
  error,
  register,
  removeImage,
  ...otherProps
}) {
  console.log({ file: image });

  const id = useId();
  return (
    <div className={styles.fileInput}>
      {label && <label htmlFor={id}>{label}</label>}
      <div
        className={styles.inputContainer}
        style={{
          ...(image && {
            backgroundImage: `url("${URL.createObjectURL(image)}")`,
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
          disabled={image ? true : false}
          {...register}
          {...otherProps}
        />
        {!image && <IoIosAddCircle className={styles.icon} />}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default ImageInput;
