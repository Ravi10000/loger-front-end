import styles from "./currency-selector.module.scss";
import { GrDown } from "react-icons/gr";

function CurrencySelector() {
  return (
    <div className={styles.currencySelector}>
      <div className={styles.selected}>
        <p>₹ INR</p>
        <GrDown />
      </div>
      <div className={styles.options}></div>
    </div>
  );
}

export default CurrencySelector;
