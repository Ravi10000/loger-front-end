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
import { Link } from "react-router-dom";
import ForgotPassword from "#components/forgot-password/forgot-password";
import EmailSent from "#components/email-sent-message/email-sent-message";

const authComponents = {
  email: <SigninEmail />,
  phone: <SigninPhone />,
  forgotPassword: <ForgotPassword />,
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
        {method !== "forgotPassword" && method !== "emailSent" && (
          <>
            <div className={styles.heading}>
              <h2>Welcome to Loger.ma</h2>
              <p>Login & Find Your Hotel Near Best Location</p>
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
                      type: "signin",
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

        {authComponents[method]}
        {method !== "forgotPassword" && method !== "emailSent" && (
          <>
            <p
              className={styles.link}
              onClick={() =>
                openAuthWindow({ type: "signup", method: "phone" })
              }
            >
              Signup
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

const SigninWindow = connect(null, { setCurrentUser, pushFlash })(
  ConnectedSigninWindow
);

// exporting it this way so that fast refresh works properly
export default SigninWindow;
