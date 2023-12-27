import styles from "./guest-info.module.scss";

import CustomInput from "#components/custom-input/custom-input";
import FileInput from "#components/file-input/file-input";
import PhoneInput from "#components/phone-input/phone-input";
import { IoRemoveCircleOutline } from "react-icons/io5";
import PropTypes from "prop-types";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { IoCheckmarkDone } from "react-icons/io5";

GuestInfo.propTypes = {
  info: PropTypes.object,
  setGuestInfo: PropTypes.func,
  removeGuestInfo: PropTypes.func,
  idx: PropTypes.number,
};

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const checkoutSchema = z.object({
  firstName: z.string().nonempty({ message: "First Name is Req  uired" }),
  lastName: z.string(),
  email: z.string().email({ message: "Invalid Email" }),
  file: z
    .any()
    .refine((file) => file?.[0], "ID Proof Required.")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .refine((file) => file?.[0]?.size <= 50_00_000, `Max image size is 5MB.`),
});

function GuestInfo({ info, setGuestInfo, idx, removeGuestInfo }) {
  const {
    register,
    handleSubmit,
    // watch,
    trigger,
    formState: { errors },
  } = useForm({ resolver: zodResolver(checkoutSchema) });
  // useEffect(() => {
  //   setGuestInfo((ps) => {
  //     const tempState = [...ps];
  //     tempState[idx].trigger = trigger;
  //     return tempState;
  //   });
  // }, []);

  return (
    <form
      className={styles.inputsContainer}
      onSubmit={handleSubmit((data) => {
        console.log({ data });
      })}
    >
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
          //   register={{ ...register("firstName") }}
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
          // register={{ ...register("lastName") }}
          // error={errors?.lastName?.message}
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
          // register={{ ...register("email") }}
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
          // register={{ ...register("file") }}
          error={info?.errors?.idProof}
        />
      </div>
      {idx !== 0 && (
        <div className={styles.removeIcon} onClick={removeGuestInfo}>
          <p style={{ color: "#fff", cursor: "none", userSelect: "none" }}>a</p>
          <IoRemoveCircleOutline />
        </div>
      )}
    </form>
  );
}

export default GuestInfo;
