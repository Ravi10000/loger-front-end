import styles from "./signup-window.module.scss";
import WithBackdrop from "#components/with-backdrop/with-backdrop";
import { useAuthWindow } from "#contexts/auth-window.context";
import { pushFlash } from "#redux/flash/flash.actions";
import { connect } from "react-redux";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import SignupEmail from "#components/signup-email/signup-email";
import SigninPhone from "#components/signin-phone/signin-phone";
import FaceBookLoginButton from "#components/facebook-login-button/facebook-login-button";
import GoogleLoginButton from "#components/google-login-button/google-login-button";

const authComponents = {
  email: <SignupEmail />,
  phone: <SigninPhone />,
};

function ConnectedSignupWindow() {
  const { openAuthWindow, closeAuthWindow, authWindow } = useAuthWindow();
  const method = authWindow?.method;

  return (
    <WithBackdrop close={closeAuthWindow}>
      <div className={styles.signupWindow} onClick={(e) => e.stopPropagation()}>
        <div className={styles.heading}>
          <h2>Welcome to Loger.ma</h2>
          <p>Sign Up & Find Your Hotel Near Best Location </p>
        </div>
        <div className={styles.icons}>
          {method === "email" ? (
            <button
              className={styles.iconContainer}
              onClick={() => {
                openAuthWindow({ type: "signup", method: "phone" });
              }}
            >
              <FaPhone className={styles.method} />
            </button>
          ) : (
            <button
              className={styles.iconContainer}
              onClick={() => {
                openAuthWindow({ type: "signup", method: "email" });
              }}
            >
              <MdEmail className={styles.method} />
            </button>
          )}
          <FaceBookLoginButton />
          <GoogleLoginButton />
          {/* <div className={styles.iconContainer}>
            <img src="/images/icons/facebook.png" alt="facebook" />
          </div>
          <div className={styles.iconContainer}>
            <img src="/images/icons/google.png" alt="google" />
          </div> */}
        </div>
        <div className={styles.seperator}>
          <p>or</p>
        </div>
        {authComponents?.[method]}
        <p
          className={styles.link}
          onClick={() => openAuthWindow({ type: "signin", method: "email" })}
        >
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

const SignupWindow = connect(null, { pushFlash })(ConnectedSignupWindow);
export default SignupWindow;
