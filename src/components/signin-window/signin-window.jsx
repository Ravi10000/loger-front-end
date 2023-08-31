import styles from "./signin-window.module.scss";
import WithBackdrop from "#components/with-backdrop/with-backdrop";
import CustomButton from "#components/custom-button/custom-button";
import CustomInput from "#components/custom-input/custom-input";
import { useEffect, useRef } from "react";
import { useAuthWindow } from "#contexts/auth-window-context";

function SigninWindow() {
  const popupRef = useRef(null);
  const { closeAuthWindow, openAuthWindow } = useAuthWindow();
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
  return (
    <WithBackdrop>
      <div ref={popupRef} className={styles.signinWindow}>
        <div className={styles.heading}>
          <h2>Welcome to Loger.ma</h2>
          <p>Login & Find Your Hotel Near Best Location</p>
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
        <div className={styles.inputsNforgotPassword}>
          <div className={styles.inputsContainer}>
            <CustomInput placeholder="example@email.com" />
            <CustomInput placeholder="password" type="password" />
          </div>
          <p>Forgot Password?</p>
        </div>
        <div className={styles.buttonContainer}>
          <CustomButton>Signin</CustomButton>
        </div>
        <p className={styles.link} onClick={() => openAuthWindow("signup")}>
          Signup
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

export default SigninWindow;
