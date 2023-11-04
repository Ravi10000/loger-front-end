import styles from "./personal-details.module.scss";
import CustomInput from "#components/custom-input/custom-input";
import CustomButton from "#components/custom-button/custom-button";
import DateInput from "#components/date-input/date-input";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import PhoneInput from "#components/phone-input/phone-input";

function PersonalDetails({ currentUser }) {
  const [dateOfBirth, setDateOfBirth] = useState(currentUser?.dateOfBirth);
  const [phone, setPhone] = useState(
    currentUser?.countryCode + currentUser?.phone
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: currentUser,
  });

  console.log({ currentUser });
  return (
    <form className={styles.personalDetails}>
      <div className={styles.inputGroup}>
        <CustomInput
          bold
          placeholder="First Name"
          label="First Name"
          register={{ ...register("fName") }}
        />
        <CustomInput
          bold
          placeholder="Last Name"
          label="Last Name"
          register={{ ...register("lName") }}
        />
      </div>
      <CustomInput
        bold
        label="Stay of Place"
        placeholder="Stay of Place"
        register={{ ...register("placeOfStay") }}
      />
      <div className={styles.inputGroup}>
        {/* <CustomInput bold label="Phone Number" placeholder="888 215 7770" /> */}
        <PhoneInput phone={phone} setPhone={setPhone} label="Phone Number" />
        {/* <CustomInput bold label="Date of Birth" placeholder="August 24 2023" /> */}
        <DateInput
          label="Date of Birth"
          placeholder="DD/MM/YYYY"
          date={dateOfBirth}
          setDate={setDateOfBirth}
          // register={{ ...register("dateOfBirth") }}
        />
      </div>
      <div className={styles.inputGroup}>
        <CustomInput
          bold
          label="Email Address"
          placeholder="loger.ma@gmail.com"
          defaultValue={currentUser?.email}
          disabled={true}
        />
        <CustomInput
          bold
          label="Gender"
          placeholder="Gender"
          register={{ ...register("gender") }}
        />
      </div>
      <CustomButton>Save</CustomButton>
    </form>
  );
}
const mapState = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapState)(PersonalDetails);
