import styles from "./personal-details.module.scss";
import CustomInput from "#components/custom-input/custom-input";
import CustomButton from "#components/custom-button/custom-button";
import DateInput from "#components/date-input/date-input";

function PersonalDetails() {
  return (
    <form className={styles.personalDetails}>
      <div className={styles.inputGroup}>
        <CustomInput bold placeholder="First Name" label="First Name" />
        <CustomInput bold placeholder="Last Name" label="Last Name" />
      </div>
      <CustomInput bold label="Stay of Place" placeholder="Stay of Place" />
      <div className={styles.inputGroup}>
        <CustomInput bold label="Phone Number" placeholder="888 215 7770" />
        {/* <CustomInput bold label="Date of Birth" placeholder="August 24 2023" /> */}
        <DateInput label="Date of Birth" placeholder="DD/MM/YYYY" />
      </div>
      <div className={styles.inputGroup}>
        <CustomInput bold label="Email Address" placeholder="loger.ma@gmail.com" />
        <CustomInput bold label="Gender" placeholder="Gender" />
      </div>
      <CustomButton>Save</CustomButton>
    </form>
  );
}

export default PersonalDetails;
