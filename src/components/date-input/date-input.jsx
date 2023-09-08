import styles from "./date-input.module.scss";
import "react-date-picker/dist/DatePicker.css";
// import "react-calendar/dist/Calendar.css";

import { useState } from "react";
import dayjs from "dayjs";
import DatePicker from "react-date-picker";

function DateInput({ label, placeholder, ...otherProps }) {
  const [date, setDate] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  // let now = new Date();
  // let maxDate = new Date();
  // maxDate.setDate(now.getDate() + 365);
  return (
    <div className={styles.dateInputContainer}>
      <label>{label}</label>
      <DatePicker
        shouldCloseCalendar={() => {
          setShowCalendar(false);
          return true;
        }}
        minDate={new Date()}
        // maxDate={maxDate}
        isOpen={showCalendar}
        onChange={(date) => setDate(dayjs(date).format("DD/MM/YYYY"))}
        value={Date.parse(date)}
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
    </div>
  );
}

export default DateInput;
