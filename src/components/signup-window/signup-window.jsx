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
import { Link } from "react-router-dom";
import { Balancer } from "react-wrap-balancer";
import { MdMarkEmailRead } from "react-icons/md";

const authComponents = {
  email: <SignupEmail />,
  phone: <SigninPhone />,
  emailSent: <EmailSent />,
};
const loginOptions = [
  {
    method: "email",
    Icon: MdEmail,
  },
  {
    method: "phone",
    Icon: FaPhone,
  },
];

function ConnectedSignupWindow() {
  const { openAuthWindow, closeAuthWindow, authWindow } = useAuthWindow();
  const method = authWindow?.method;

  return (
    <WithBackdrop close={closeAuthWindow}>
      <div className={styles.signupWindow} onClick={(e) => e.stopPropagation()}>
        {method !== "emailSent" && (
          <>
            <div className={styles.heading}>
              <h2>Welcome to Loger.ma</h2>
              <p>Sign Up & Find Your Hotel Near Best Location </p>
            </div>
            <div className={styles.icons}>
              {loginOptions?.map((LoginType) => (
                <button
                  key={LoginType.method}
                  className={`${styles.iconContainer} ${
                    LoginType.method === method ? styles.selected : ""
                  }`}
                  onClick={() => {
                    openAuthWindow({
                      type: "signup",
                      method: LoginType.method,
                    });
                  }}
                >
                  <LoginType.Icon className={styles.method} />
                </button>
              ))}
              <FaceBookLoginButton />
              <GoogleLoginButton />
            </div>
            <div className={styles.seperator}>
              <p>or</p>
            </div>
          </>
        )}
        {authComponents?.[method]}
        {method !== "emailSent" && (
          <>
            <p
              className={styles.link}
              onClick={() =>
                openAuthWindow({ type: "signin", method: "email" })
              }
            >
              Signin
            </p>
            <p>
              <span>By continuing you agree to Loger.ma</span>
              <br />
              <Link
                to="/terms"
                className={styles.link}
                onClick={closeAuthWindow}
              >
                Terms of Services & Privacy Policy
              </Link>
            </p>
          </>
        )}
      </div>
    </WithBackdrop>
  );
}

function EmailSent() {
  const { openAuthWindow } = useAuthWindow();
  return (
    <div className={styles.emailSent}>
      <div className={styles.iconContainer}>
        <MdMarkEmailRead className={styles.icon} />
      </div>
      <p>
        Thank you for registering on Loger.ma!
        <br /> we&apos;ve sent you an email with verification link,
        <br /> please verify your email address.
      </p>
      <button
        className={styles.goToSignin}
        onClick={() => {
          openAuthWindow({ type: "signin", method: "email" });
        }}
      >
        <Balancer>I&apos;ve verified my account, Take me to Sign in</Balancer>
      </button>
    </div>
  );
}

const SignupWindow = connect(null, { pushFlash })(ConnectedSignupWindow);
export default SignupWindow;
