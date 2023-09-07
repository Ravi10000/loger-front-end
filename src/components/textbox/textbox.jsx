import styles from "./textbox.module.scss";

import { useId } from "react";

function Textbox({ label, register, ...otherProps }) {
  const id = useId();
  return (
    <div className={styles.textbox}>
      <label htmlFor={id}>{label}</label>
      <textarea id={id} {...otherProps} {...register}></textarea>
    </div>
  );
}

export default Textbox;
