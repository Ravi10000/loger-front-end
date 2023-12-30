import styles from "./google-login-button.module.scss";
import { FcGoogle } from "react-icons/fc";
// import { auth, googleProvider } from "#firebase/firebase.config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "#firebase/firebase.config";
import { connect } from "react-redux";
import { pushFlash } from "#redux/flash/flash.actions";
import { setCurrentUser } from "#redux/user/user.actions";
import PropTypes from "prop-types";
import { googleLogin } from "#api/auth.req";
import { setAuthToken } from "#api/index";
import { useState } from "react";
import LoadingPage from "#pages/loading/loading";
const googleProvider = new GoogleAuthProvider();

ConnectedGoogleLoginButton.propTypes = {
  pushFlash: PropTypes.func,
  setCurrentUser: PropTypes.func,
};
function ConnectedGoogleLoginButton({ pushFlash, setCurrentUser }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handleGoogleLogin = async () => {
    setIsPopupOpen(true);
    try {
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
    } finally {
      setIsPopupOpen(false);
    }
  };
  return (
    <button
      disabled={isPopupOpen}
      className={styles["google-login-button"]}
      onClick={handleGoogleLogin}
    >
      {isPopupOpen ? (
        <LoadingPage.Loader style={{ fontSize: "12px" }} />
      ) : (
        <FcGoogle className={styles.icon} />
      )}
    </button>
  );
}

const GoogleLoginButton = connect(null, { pushFlash, setCurrentUser })(
  ConnectedGoogleLoginButton
);

export default GoogleLoginButton;
