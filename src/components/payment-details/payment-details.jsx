import CustomButton from "#components/custom-button/custom-button";
import CustomInput from "#components/custom-input/custom-input";
import DateInput from "#components/date-input/date-input";
import styles from "./payment-details.module.scss";
function PaymentDetails() {
  return (
    <div className={styles.paymentDetails}>
      <div className={styles.inputGroup}>
        <CustomInput
          bold
          label="Card Holder Name"
          placeholder="Card Holder Name"
        />
        <CustomInput bold label="Card Number" placeholder="Card Number" />
      </div>
      <div className={styles.inputGroup}>
        <CustomInput bold label="CVV" placeholder="CVV" />
        {/* <CustomInput bold label="Expiry Date" placeholder="DD/MM/YY" /> */}
        <DateInput label="Expiry Date" placeholder="MM / YY" />
      </div>
      <CustomButton>Save</CustomButton>
    </div>
  );
}

export default PaymentDetails;
