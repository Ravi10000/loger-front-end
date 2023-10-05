import styles from "./date-input.module.scss";
import "react-date-picker/dist/DatePicker.css";
// import "react-calendar/dist/Calendar.css";

import { useState } from "react";
import dayjs from "dayjs";
import DatePicker from "react-date-picker";

function DateInput({
  label,
  placeholder,
  error,
  date,
  setDate,
  ...otherProps
}) {
  // const [date, setDate] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  // let now = new Date();
  // let maxDate = new Date();
  // maxDate.setDate(now.getDate() + 365);
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
        // minDate={new Date()}
        // maxDate={maxDate}
        isOpen={showCalendar}
        onChange={(date) =>
          setDate && setDate(dayjs(date).format("DD-MM-YYYY"))
        }
        // value={date && Date.parse(data)}
        {...datePickerProps}
      />
      <div className={styles.dateInput}>
        <button
          type="button"
          className={styles.datePickerBtn}
          onClick={() => setShowCalendar((prevState) => !prevState)}
        >
          {date || <p>{placeholder}</p>}
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
