import styles from "./custom-date-picker.module.scss";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";

import { useState } from "react";
import DatePicker from "react-date-picker";

function CustomDatePicker({ label }) {
  const [date, setDate] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  let now = new Date();
  let maxDate = new Date();
  maxDate.setDate(now.getDate() + 365);
  return (
    <div className={styles.datePickerContainer}>
      <button
        className={styles.datePickerBtn}
        onClick={() => setShowCalendar((prevState) => !prevState)}
      >
        <img
          className={styles.calendarIcon}
          src="/images/icons/calender.svg"
          alt="date picker"
        />

        {date || <p>{label}</p>}
      </button>
      <DatePicker
        shouldCloseCalendar={() => {
          setShowCalendar(false);
          return true;
        }}
        minDate={new Date()}
        maxDate={maxDate}
        isOpen={showCalendar}
        onChange={(date) => setDate(dayjs(date).format("DD/MM/YYYY"))}
        value={Date.parse(date)}
      />
    </div>
  );
}

export default CustomDatePicker;
