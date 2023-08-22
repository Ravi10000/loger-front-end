import styles from "./country-selector.module.scss";
import { GrDown } from "react-icons/gr";

function CountrySelector() {
  return (
    <div className={styles.countrySelector}>
      <div className={styles.selected}>
        <img src="/images/country.png" alt="country" />
      </div>
      <div className={styles.options}></div>
    </div>
  );
}

export default CountrySelector;
