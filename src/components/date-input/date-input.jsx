import styles from "./date-input.module.scss";
import "react-date-picker/dist/DatePicker.css";

import { useState } from "react";
import dayjs from "dayjs";
import DatePicker from "react-date-picker";
import PropTypes from "prop-types";

DateInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  date: PropTypes.string,
  setDate: PropTypes.func,
};

function DateInput({ label, placeholder, error, date, setDate }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const datePickerProps = {
    ...(date && { value: Date.parse(date) }),
  };
  return (
    <div className={styles.dateInputContainer}>
      {label && <label>{label}</label>}
      <DatePicker
        shouldCloseCalendar={() => {
          setShowCalendar(false);
          return true;
        }}
        isOpen={showCalendar}
        onChange={(date) =>
          setDate && setDate(dayjs(date).format("YYYY-MM-DD"))
        }
        {...datePickerProps}
      />
      <div className={styles.dateInput}>
        <button
          type="button"
          className={styles.datePickerBtn}
          onClick={() => setShowCalendar((prevState) => !prevState)}
        >
          {date || placeholder}
          <img
            className={styles.calendarIcon}
            src="/images/icons/calendar.svg"
            alt="date picker"
          />
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default DateInput;
