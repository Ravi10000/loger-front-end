import styles from "./signin-window.module.scss";
import WithBackdrop from "#components/with-backdrop/with-backdrop";
import { useAuthWindow } from "#contexts/auth-window.context";
import { setCurrentUser } from "#redux/user/user.actions";
import { pushFlash } from "#redux/flash/flash.actions";
import { connect } from "react-redux";
import SigninEmail from "#components/signin-email/signin-email";
import SigninPhone from "#components/signin-phone/signin-phone";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import GoogleLoginButton from "#components/google-login-button/google-login-button";
import FaceBookLoginButton from "#components/facebook-login-button/facebook-login-button";
// import { useEffect, useRef } from "react";
// import { useClickAway } from "@uidotdev/usehooks";

const authComponents = {
  email: <SigninEmail />,
  phone: <SigninPhone />,
};

function ConnectedSigninWindow() {
  const { closeAuthWindow, openAuthWindow, authWindow } = useAuthWindow();
  const method = authWindow?.method;
  return (
    <WithBackdrop close={closeAuthWindow}>
      <div
        className={styles.signinWindow}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.heading}>
          <h2>Welcome to Loger.ma</h2>
          <p>Login & Find Your Hotel Near Best Location</p>
        </div>
        <div className={styles.icons}>
          {method === "email" ? (
            <button
              className={styles.iconContainer}
              onClick={() => {
                openAuthWindow({ type: "signin", method: "phone" });
              }}
            >
              <FaPhone className={styles.method} />
            </button>
          ) : (
            <button
              className={styles.iconContainer}
              onClick={() => {
                openAuthWindow({ type: "signin", method: "email" });
              }}
            >
              <MdEmail className={styles.method} />
            </button>
          )}
          <FaceBookLoginButton />
          {/* <button className={styles.iconContainer}>
            <img src="/images/icons/facebook.png" alt="facebook" />
          </button> */}
          <GoogleLoginButton />
          {/* <button className={styles.iconContainer}>
            <img src="/images/icons/google.png" alt="google" />
          </button> */}
          {/* <GoogleAuthButton /> */}
        </div>
        <div className={styles.seperator}>
          <p>or</p>
        </div>
        {authComponents[method]}
        <p
          className={styles.link}
          onClick={() => openAuthWindow({ type: "signup", method: "phone" })}
        >
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

const SigninWindow = connect(null, { setCurrentUser, pushFlash })(
  ConnectedSigninWindow
);

// exporting it this way so that fast refresh works properly
export default SigninWindow;
