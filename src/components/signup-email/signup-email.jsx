import CustomInput from "#components/custom-input/custom-input";
import styles from "./signup-email.module.scss";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signupWithEmail } from "#api/auth.req";
import { useAuthWindow } from "#contexts/auth-window.context";
import PhoneInput from "#components/phone-input/phone-input";
import DateInput from "#components/date-input/date-input";
import { useState, useEffect } from "react";
import LoadingPage from "#pages/loading/loading";
import { zodResolver } from "@hookform/resolvers/zod";
import { getPhoneNCountryCode } from "#utils/phone.util";
import CustomButton from "#components/custom-button/custom-button";
import PropTypes from "prop-types";
import { pushFlash } from "#redux/flash/flash.actions";
import { connect } from "react-redux";
import { signupFormSchema as schema } from "#schemas/signup.schema";

ConnectedSignupEmail.propTypes = {
  pushFlash: PropTypes.func,
};

function ConnectedSignupEmail({ pushFlash }) {
  const { closeAuthWindow, openAuthWindow } = useAuthWindow();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fName: "Ravi",
      lName: "Sharma",
      email: "test25@email.com",
      language: "english",
      gender: "male",
      placeOfStay: "New Delhi, India",
      password: "Password123@",
      confirmPassword: "Password123@",
    },
  });
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(null);
  const [dob, setDob] = useState("");
  const [dobError, setDobError] = useState(null);
  const [formTriggered, setFormTriggered] = useState(false);

  const { mutate, status } = useMutation({
    mutationFn: async (data) => {
      if (!formTriggered) setFormTriggered(true);
      console.log({ data });
      const validationErrors = {};
      const countryCode = phone?.split(" ")?.[0];
      const phoneNumber = phone?.split(" ")?.[1];
      if (
        !phoneNumber ||
        phoneNumber?.length < 9 ||
        !countryCode ||
        countryCode?.length < 3
      )
        validationErrors.phoneError = "invalid phone number";
      if (!dob) validationErrors.dobError = "invalid date of birth";
      if (Object.keys(validationErrors).length)
        throw new Error("validation error");

      const response = await signupWithEmail({
        ...data,
        phone: phoneNumber?.replace("-", ""),
        countryCode,
        dateOfBirth: dob,
      });
      return response.data;
    },
    onSuccess: (data) => {
      if (data?.status === "success") {
        openAuthWindow({
          type: "signup",
          method: "emailSent",
        });
      }
    },
    onError: (error) => {
      console.error({ error });
      if (error?.response)
        pushFlash({
          type: "error",
          message: error?.response?.data?.message || "Something went wrong",
        });
    },
  });

  useEffect(() => {
    if (!formTriggered) return;
    const { phoneNumber, countryCode } = getPhoneNCountryCode(phone);
    if (
      !phoneNumber ||
      phoneNumber?.length < 9 ||
      !countryCode ||
      countryCode?.length < 3
    )
      setPhoneError("invalid phone number");
    else setPhoneError(null);
  }, [phone, formTriggered]);

  useEffect(() => {
    if (!formTriggered) return;
    if (!dob) setDobError("date of birth required");
    else setDobError(null);
  }, [dob, formTriggered]);

  return (
    <>
      <form
        id="signup-email"
        onSubmit={handleSubmit(mutate)}
        className={styles.signUpEmailForm}
      >
        <div className={styles.inputsContainer}>
          <div className={styles.twoInputs}>
            <CustomInput
              placeholder="first name"
              register={{ ...register("fName") }}
              error={errors?.fName?.message}
            />
            <CustomInput
              placeholder="last name"
              register={{ ...register("lName") }}
              error={errors?.lName?.message}
            />
          </div>

          <CustomInput
            placeholder="example@email.com"
            register={{ ...register("email") }}
            error={errors?.email?.message}
          />
          <CustomInput
            placeholder="Stay Of Place"
            register={{ ...register("placeOfStay") }}
            error={errors?.placeOfStay?.message}
          />
          <div className={styles.twoInputs}>
            <div style={{ width: "100%" }}>
              <PhoneInput
                phone={phone}
                setPhone={setPhone}
                error={phoneError}
              />
            </div>
            <DateInput
              placeholder="Date Of Birth"
              setDate={setDob}
              date={dob}
              error={dobError}
            />
          </div>
          <div className={styles.twoInputs}>
            <CustomInput
              placeholder="Language"
              register={{ ...register("language") }}
              error={errors?.language?.message}
            />
            <CustomInput
              placeholder="Gender"
              autoComplete="gender"
              register={{ ...register("gender") }}
              error={errors?.gender?.message}
            />
          </div>
          <CustomInput
            placeholder="password"
            type="password"
            autoComplete="new-password"
            register={{ ...register("password") }}
            error={errors?.password?.message}
          />
          <CustomInput
            placeholder="confirm password"
            type="password"
            autoComplete="new-password"
            register={{ ...register("confirmPassword") }}
            error={errors?.confirmPassword?.message}
          />
        </div>
      </form>
      <div className={styles.buttonContainer}>
        <CustomButton form="signup-email" disabled={status === "pending"}>
          <span>Signup</span>
          {status === "pending" && (
            <LoadingPage.Loader style={{ fontSize: "16px", color: "#fff" }} />
          )}
        </CustomButton>
      </div>
    </>
  );
}

const SignupEmail = connect(null, { pushFlash })(ConnectedSignupEmail);

export default SignupEmail;
