import styles from "./change-password.module.scss";
import CustomButton from "#components/custom-button/custom-button";
import CustomInput from "#components/custom-input/custom-input";

function ChangePassword() {
  return (
    <div className={styles.changePassword}>
      <CustomInput
        bold
        label="Old Password"
        placeholder="**********"
        type="password"
      />
      <div className={styles.inputGroup}>
        <CustomInput
          bold
          label="New Password"
          placeholder="**********"
          type="password"
        />
        <CustomInput
          bold
          label="Confirm Password"
          placeholder="**********"
          type="password"
        />
      </div>
      <CustomButton>Save</CustomButton>
    </div>
  );
}

export default ChangePassword;
