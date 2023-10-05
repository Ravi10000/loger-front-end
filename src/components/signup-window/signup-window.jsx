import styles from "./signup-window.module.scss";
import WithBackdrop from "#components/with-backdrop/with-backdrop";
import CustomButton from "#components/custom-button/custom-button";
import CustomInput from "#components/custom-input/custom-input";
import { useEffect, useRef, useState } from "react";
import { useAuthWindow } from "#contexts/auth-window.context";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signupWithEmail } from "#api/auth.req";
import { pushFlash } from "#redux/flash/flash.actions";
import { connect } from "react-redux";
import PhoneInput from "#components/phone-input/phone-input";
import DateInput from "#components/date-input/date-input";
const schema = z
  .object({
    fName: z
      .string()
      .nonempty({ message: "first name required" })
      .max(50, { message: "first name must be less than 50 characters" }),
    lName: z
      .string()
      .nonempty({ message: "last name required" })
      .max(50, { message: "last name must be less than 50 characters" }),
    email: z.string().email({ message: "invalid email" }).nonempty({
      message: "email required",
    }),
    language: z.string().nonempty({ message: "language required" }).max(50, {
      message: "language length should be less than 50 characters",
    }),
    gender: z.string().nonempty({ message: "gender required" }).max(50, {
      message: "gender length should be less than 50 characters",
    }),
    placeOfStay: z.string().nonempty({ message: "place of stay required" }),
    password: z
      .string()
      .nonempty({ message: "Password required" })
      .min(8, { message: "Password should be atleast 8 characters" })
      .max(16, { message: "Password should be atmost 16 characters" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        {
          message:
            "Password should contain atleast one uppercase, one lowercase, one number and one special character",
        }
      ),
    confirmPassword: z.string().nonempty({
      message: "confirm password required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords do not match",
    path: ["confirmPassword"],
  });
function SignupWindow({ pushFlash }) {
  const popupRef = useRef(null);
  const { openAuthWindow, closeAuthWindow } = useAuthWindow();
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
  console.log({ errors });
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(null);
  const [dob, setDob] = useState("");
  const [dobError, setDobError] = useState(null);
  const [formTriggered, setFormTriggered] = useState(false);

  const signupMutation = useMutation({
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

      console.error({ validationErrors });
      console.log({
        isError: !!Object.keys(validationErrors).length,
        validationErrors,
      });
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
      console.log("success");
      console.log({ data });
      pushFlash({
        type: "success",
        message: "OTP Sent to your email",
      });
      closeAuthWindow();
    },
    onError: (error) => {
      console.error({ error });
      if (error?.response)
        pushFlash({
          type: "error",
          message: error?.response?.data?.message,
        });
    },
  });
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target))
        closeAuthWindow();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);
  useEffect(() => {
    if (!formTriggered) return;
    const countryCode = phone?.split(" ")?.[0];
    const phoneNumber = phone?.split(" ")?.[1];
    console.log({ phoneNumber });
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
    <WithBackdrop>
      <div ref={popupRef} className={styles.signupWindow}>
        <div className={styles.heading}>
          <h2>Welcome to Loger.ma</h2>
          <p>Sign Up & Find Your Hotel Near Best Location </p>
        </div>
        <div className={styles.icons}>
          <div className={styles.iconContainer}>
            <img src="/images/icons/phone.png" alt="phone" />
          </div>
          <div className={styles.iconContainer}>
            <img src="/images/icons/facebook.png" alt="facebook" />
          </div>
          <div className={styles.iconContainer}>
            <img src="/images/icons/google.png" alt="google" />
          </div>
        </div>
        <div className={styles.seperator}>
          <p>or</p>
        </div>
        <form
          id="signup-form"
          onSubmit={handleSubmit(signupMutation.mutate)}
          className={styles.inputsNforgotPassword}
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
          {/* <p>Forgot Password?</p> */}
        </form>
        <div className={styles.buttonContainer}>
          <CustomButton form="signup-form">Signup</CustomButton>
        </div>
        <p className={styles.link} onClick={() => openAuthWindow("signin")}>
          Signin
        </p>
        <p>
          By continuing you agree Loger.ma{" "}
          <span className={styles.link}>
            Terms of Services & Privacy Policy
          </span>
        </p>
      </div>
    </WithBackdrop>
  );
}

export default connect(null, { pushFlash })(SignupWindow);
