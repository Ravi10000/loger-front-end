import styles from "./search.module.scss";
import { useId } from "react";
import MemberInfo from "#components/member-info/member-info";
import { useNavigate } from "react-router-dom";
import CustomDatePicker from "#components/custom-date-picker/custom-date-picker";
function Search() {
  const id = useId();
  const navigate = useNavigate();

  return (
    <div className={styles.searchContainer}>
      <div className={styles.search}>
        <div className={`${styles.inputContainer} ${styles.hotelSelector}`}>
          <label htmlFor={`${id}-hotelSelector`}>
            <img src="/images/icons/location.svg" alt="location" />
          </label>
          <input
            id={`${id}-hotelSelector`}
            className={styles.hotelInput}
            placeholder="Choose Your Area or Hotel Name"
          />
        </div>
        <div className={styles.dates}>
          <div className={styles.inputContainer}>
            <CustomDatePicker label="Check In" />
          </div>
          <div className={styles.inputContainer}>
            <CustomDatePicker label="Check Out" />
          </div>
        </div>
        <MemberInfo />
        <button
          className={styles.searchBtn}
          onClick={() => navigate("/search-results")}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default Search;
