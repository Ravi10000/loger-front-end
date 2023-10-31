import { AiOutlineMinusCircle } from "react-icons/ai";
import styles from "./counter.module.scss";
import { BsPlusCircle } from "react-icons/bs";

function Counter({ title, subtitle, value, setValue }) {
  const decrement = () => {
    if (value <= 0) return;
    setValue((prevCount) => (prevCount = parseInt(prevCount) - 1));
  };
  const increment = () => {
    setValue((prevCount) => (prevCount = parseInt(prevCount) + 1));
  };
  return (
    <div className={styles.detail}>
      <div className={styles.heading}>
        <h4 className={styles.title}>{title}</h4>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <div className={styles.actions}>
        <AiOutlineMinusCircle
          className={`${styles.icon} ${styles.minus}`}
          onClick={decrement}
        />
        <p>{value}</p>
        <BsPlusCircle
          className={`${styles.icon} ${styles.plus}`}
          onClick={increment}
        />
      </div>
    </div>
  );
}

export default Counter;
