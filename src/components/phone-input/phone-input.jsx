import { PhoneInput as InternationalPhoneNumberInput } from "react-international-phone";
import "react-international-phone/style.css";
import PropTypes from "prop-types";

PhoneInput.propTypes = {
  phone: PropTypes.string,
  error: PropTypes.string,
  setPhone: PropTypes.func,
  secondary: PropTypes.bool,
  label: PropTypes.string,
};

function PhoneInput({ phone, error, setPhone, secondary, label }) {
  return (
    <div className="__custom_phone_container">
      {label && <label className="secondary_phone_label">{label}</label>}
      <InternationalPhoneNumberInput
        className={secondary ? "secondary_phone_input_container" : ""}
        inputClassName={secondary ? "secondary_phone_input" : ""}
        defaultCountry="ma"
        value={phone}
        // onChange={setPhone}
        onChange={(_, values) => setPhone(values?.inputValue)}
      />
      {error && (
        <p
          style={{
            textAlign: "left",
            padding: "5px",
            fontSize: "0.8rem",
            letterSpacing: "2px",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default PhoneInput;
