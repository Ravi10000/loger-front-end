import styles from "./counter.module.scss";

import PropTypes from "prop-types";
import { AiOutlineMinusCircle } from "react-icons/ai";
// import { BsPlusCircle } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
Counter.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  value: PropTypes.number,
  setValue: PropTypes.func,
  containerStyles: PropTypes.object,
  buttonStyles: PropTypes.object,
};

function Counter({
  title,
  subtitle,
  value,
  setValue,
  containerStyles = {},
  buttonStyles = {},
}) {
  const decrement = () => {
    if (value <= 0) return;
    setValue((prevCount) => (prevCount = parseInt(prevCount) - 1));
  };
  const increment = () => {
    setValue((prevCount) => (prevCount = parseInt(prevCount) + 1));
  };
  return (
    <div className={styles.detail} style={containerStyles}>
      <div className={styles.heading}>
        <h4 className={styles.title}>{title}</h4>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <div className={styles.actions}>
        <AiOutlineMinusCircle
          style={buttonStyles}
          className={`${styles.icon} ${styles.minus}`}
          onClick={decrement}
          role="button"
        />
        <p>{value}</p>
        <IoMdAddCircle
          style={buttonStyles}
          className={`${styles.icon} ${styles.plus}`}
          onClick={increment}
          role="button"
        />
      </div>
    </div>
  );
}

export default Counter;
