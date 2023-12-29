import styles from "./signin-phone.module.scss";
import { setCurrentUser } from "#redux/user/user.actions";
import { pushFlash } from "#redux/flash/flash.actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CustomButton from "#components/custom-button/custom-button";
import { useMutation } from "@tanstack/react-query";
import PhoneInput from "#components/phone-input/phone-input";
import { useAuthWindow } from "#contexts/auth-window.context";
import { useEffect, useRef, useState } from "react";
import { generateOTP, verifyOTP } from "#api/auth.req";
import { getPhoneNCountryCode } from "#utils/phone.util";
import LoadingPage from "#pages/loading/loading";
import CustomInput from "#components/custom-input/custom-input";
import { setAuthToken } from "#api/index";

ConnectedSigninPhone.propTypes = {
  setCurrentUser: PropTypes.func,
  pushFlash: PropTypes.func,
};

function ConnectedSigninPhone({ setCurrentUser, pushFlash }) {
  const [stage, setStage] = useState(0);
  const [phone, setPhone] = useState("");

  const props = {
    pushFlash,
    setCurrentUser,
    setStage,
    phone,
    setPhone,
  };

  if (stage === 1) return <VerifyOTPForm {...props} />;
  return <GenerateOTPForm {...props} />;
}

GenerateOTPForm.propTypes = {
  setStage: PropTypes.func,
  phone: PropTypes.string,
  setPhone: PropTypes.func,
  pushFlash: PropTypes.func,
};

function GenerateOTPForm({ setStage, phone, setPhone, pushFlash }) {
  const { countryCode, phoneNumber } = getPhoneNCountryCode(phone);
  const { mutate, status } = useMutation({
    mutationFn: async () => {
      const response = await generateOTP({ countryCode, phone: phoneNumber });
      if (response?.data?.message === "otp sent") {
        setStage(1);
        pushFlash({ type: "success", message: "OTP Sent" });
      }
    },
    onError: () => {
      pushFlash({
        type: "error",
        message: "Something Went Wrong, please try again",
      });
    },
  });
  return (
    <>
      <form
        name="generate-otp"
        className={styles.signInPhoneForm}
        onSubmit={(e) => {
          e.preventDefault();
          mutate();
        }}
      >
        <PhoneInput phone={phone} setPhone={setPhone} />
      </form>
      <div className={styles.buttonContainer}>
        <CustomButton
          form="generate-otp"
          disabled={
            !countryCode || !(phone?.length > 5) || status === "pending"
          }
        >
          <span>Send OTP</span>
          {status === "pending" && (
            <LoadingPage.Loader style={{ fontSize: "16px", color: "#fff" }} />
          )}
        </CustomButton>
      </div>
    </>
  );
}
VerifyOTPForm.propTypes = {
  setStage: PropTypes.func,
  setPhone: PropTypes.func,
  phone: PropTypes.string,
  pushFlash: PropTypes.func,
  setCurrentUser: PropTypes.func,
};

function VerifyOTPForm({
  setStage,
  phone,
  setPhone,
  pushFlash,
  setCurrentUser,
}) {
  const { closeAuthWindow } = useAuthWindow();
  const inputRef = useRef();
  const [otp, setOtp] = useState("");
  const { countryCode, phoneNumber } = getPhoneNCountryCode(phone);
  const { mutate, status } = useMutation({
    mutationFn: async () => {
      const response = await verifyOTP({
        otp,
        phone: phoneNumber,
        countryCode,
      });
      const { data } = response;
      if (data?.message === "otp verified") {
        setCurrentUser(data?.user);
        setAuthToken(data?.accessToken);
        pushFlash({ type: "success", message: "Welcome to Loger.ma" });
        closeAuthWindow();
      }
    },
    onError: (err) => {
      setOtp("");
      pushFlash({
        type: "error",
        message: err?.response?.data?.message || "Something Went Wrong",
      });
    },
  });

  const goBack = () => {
    setStage(0);
    setPhone("");
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);
  return (
    <>
      <h3>{phone}</h3>
      <form
        name="verify-otp"
        className={styles.signInPhoneForm}
        onSubmit={(e) => {
          e.preventDefault();
          mutate();
        }}
      >
        <CustomInput
          ref={inputRef}
          otp
          placeholder="6 digit OTP"
          value={otp}
          onInput={(e) =>
            (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
          }
          maxLength="6"
          onChange={(e) => {
            setOtp(e.target.value);
          }}
        />
      </form>
      <div className={styles.buttonContainer}>
        <CustomButton
          form="verify-otp"
          disabled={otp?.length !== 6 || status === "pending"}
        >
          <span>Verify</span>
          {status === "pending" && (
            <LoadingPage.Loader style={{ fontSize: "16px", color: "#fff" }} />
          )}
        </CustomButton>
      </div>
      <button className={styles.backBtn} onClick={goBack}>
        Go back
      </button>
    </>
  );
}
const SigninPhone = connect(null, { setCurrentUser, pushFlash })(
  ConnectedSigninPhone
);
export default SigninPhone;
