import { PhoneInput as InternationalPhoneNumberInput } from "react-international-phone";
import "react-international-phone/style.css";

function PhoneInput({ phone, error, setPhone, secondary, label }) {
  return (
    <div className="__custom_phone_container">
      {label && <label className="secondary_phone_label">{label}</label>}
      <InternationalPhoneNumberInput
        className={secondary ? "secondary_phone_input_container" : ""}
        inputClassName={secondary ? "secondary_phone_input" : ""}
        defaultCountry="ma"
        value={phone}
        onChange={(phone) => setPhone(phone)}
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
