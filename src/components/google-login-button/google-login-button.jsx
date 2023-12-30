import styles from "./google-login-button.module.scss";
import { FcGoogle } from "react-icons/fc";
// import { auth, googleProvider } from "#firebase/firebase.config";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { connect } from "react-redux";
import { pushFlash } from "#redux/flash/flash.actions";
import { setCurrentUser } from "#redux/user/user.actions";
import PropTypes from "prop-types";
import { googleLogin } from "#api/auth.req";
import { setAuthToken } from "#api/index";

ConnectedGoogleLoginButton.propTypes = {
  pushFlash: PropTypes.func,
  setCurrentUser: PropTypes.func,
};
function ConnectedGoogleLoginButton({ pushFlash, setCurrentUser }) {
  const handleGoogleLogin = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      const auth = getAuth();
      auth.useDeviceLanguage();
      const authResponse = await signInWithPopup(auth, googleProvider);
      console.log({ authResponse });
      const user = authResponse?.user;
      if (authResponse?.user) {
        try {
          const { data } = await googleLogin({
            uid: user?.uid,
            email: user?.email,
            displayName: user?.displayName,
          });
          if (data?.user) {
            setCurrentUser(data?.user);
            setAuthToken(data?.accessToken);
            pushFlash({
              type: "success",
              message: "Welcome to Loger.ma",
            });
          }
        } catch (apiGoogleLoginError) {
          console.log({ apiGoogleLoginError });
          pushFlash({
            type: "error",
            message: "Something went wrong, please try again.",
          });
        }
      }
    } catch (googleError) {
      console.error({ googleError });
      // pushFlash({
      //   message:
      //     googleError?.response?.data?.message ||
      //     "Something went wrong, please try again.",
      //   type: "error",
      // });
    }
  };
  return (
    <div>
      <button
        className={styles["google-login-button"]}
        onClick={handleGoogleLogin}
      >
        <FcGoogle className={styles.icon} />
      </button>
    </div>
  );
}

const GoogleLoginButton = connect(null, { pushFlash, setCurrentUser })(
  ConnectedGoogleLoginButton
);

export default GoogleLoginButton;
