import styles from "./custom-date-picker.module.scss";
import "react-date-picker/dist/DatePicker.css";
import { useState } from "react";

import dayjs from "dayjs";
import PropTypes from "prop-types";

import DatePicker from "react-date-picker";

CustomDatePicker.propTypes = {
  label: PropTypes.string,
  date: PropTypes.string,
  setDate: PropTypes.func,
};

function CustomDatePicker({ label, date, setDate }) {
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

        {date ? dayjs(date).format("DD-MMM-YYYY") : <p>{label}</p>}
      </button>
      <DatePicker
        shouldCloseCalendar={() => {
          setShowCalendar(false);
          return true;
        }}
        minDate={new Date()}
        maxDate={maxDate}
        isOpen={showCalendar}
        onChange={(date) =>
          setDate && setDate(dayjs(date).format("YYYY-MM-DD"))
        }
      />
    </div>
  );
}

export default CustomDatePicker;
