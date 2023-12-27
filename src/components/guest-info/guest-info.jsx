import styles from "./guest-info.module.scss";

import CustomInput from "#components/custom-input/custom-input";
import FileInput from "#components/file-input/file-input";
import PhoneInput from "#components/phone-input/phone-input";
import { IoRemoveCircleOutline } from "react-icons/io5";
import PropTypes from "prop-types";

GuestInfo.propTypes = {
  info: PropTypes.object,
  setGuestInfo: PropTypes.func,
  removeGuestInfo: PropTypes.func,
  idx: PropTypes.number,
};

function GuestInfo({ info, setGuestInfo, idx, removeGuestInfo }) {
  return (
    <div className={styles.inputsContainer}>
      <div className={styles.inputContainer}>
        <CustomInput
          secondary
          label="First Name"
          bold
          placeholder="First Name"
          value={info.firstName}
          onChange={(e) => {
            setGuestInfo({ key: "firstName", value: e.target.value });
          }}
          error={info?.errors?.firstName}
        />
      </div>
      <div className={styles.inputContainer}>
        <CustomInput
          secondary
          label="Last Name"
          bold
          placeholder="Last Name"
          value={info.lastName}
          onChange={(e) => {
            setGuestInfo({ key: "lastName", value: e.target.value });
          }}
        />
      </div>
      <div className={styles.inputContainer}>
        <PhoneInput
          phone={info.phone}
          setPhone={(value) => {
            setGuestInfo({ key: "phone", value });
          }}
          label="Phone"
          secondary
          error={info?.errors?.phone}
        />
      </div>
      <div className={styles.inputContainer}>
        <CustomInput
          secondary
          label="Email"
          bold
          placeholder="Email"
          value={info.email}
          onChange={(e) => {
            setGuestInfo({ key: "email", value: e.target.value });
          }}
          error={info?.errors?.email}
        />
      </div>

      <div className={styles.inputContainer}>
        <FileInput
          label={"Any ID Proof"}
          placeholder="Attach Any ID Proof"
          onChange={(e) => {
            console.log({ fileName: e?.target?.files?.item?.(0).name });
            setGuestInfo({ key: "file", value: e?.target?.files?.item?.(0) });
          }}
          defaultValue={info?.idProof ? "ID Proof Uploaded" : null}
          file={info?.file?.name ? info.file : null}
          error={info?.errors?.idProof}
        />
      </div>
      {idx !== 0 && (
        <div className={styles.removeIcon} onClick={removeGuestInfo}>
          <p style={{ color: "#fff", cursor: "none", userSelect: "none" }}>a</p>
          <IoRemoveCircleOutline />
        </div>
      )}
    </div>
  );
}

export default GuestInfo;
