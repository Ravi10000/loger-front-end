import { PhoneInput as InternationalPhoneNumberInput } from "react-international-phone";
import "react-international-phone/style.css";

function PhoneInput({ phone, error, setPhone }) {
  return (
    <div>
      <InternationalPhoneNumberInput
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
