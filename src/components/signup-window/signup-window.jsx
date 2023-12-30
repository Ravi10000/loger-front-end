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

const authComponents = {
  email: <SignupEmail />,
  phone: <SigninPhone />,
};

function ConnectedSignupWindow() {
  const { openAuthWindow, closeAuthWindow, authWindow } = useAuthWindow();
  const method = authWindow?.method;
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
  return (
    <WithBackdrop close={closeAuthWindow}>
      <div className={styles.signupWindow} onClick={(e) => e.stopPropagation()}>
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
                openAuthWindow({ type: "signup", method: LoginType.method });
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
        {authComponents?.[method]}
        <p
          className={styles.link}
          onClick={() => openAuthWindow({ type: "signin", method: "email" })}
        >
          Signin
        </p>
        <p>
          <span>By continuing you agree to Loger.ma</span>
          <br />
          <Link to="/terms" className={styles.link} onClick={closeAuthWindow}>
            Terms of Services & Privacy Policy
          </Link>
        </p>
      </div>
    </WithBackdrop>
  );
}

const SignupWindow = connect(null, { pushFlash })(ConnectedSignupWindow);
export default SignupWindow;
