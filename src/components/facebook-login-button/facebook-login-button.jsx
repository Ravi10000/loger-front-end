import { pushFlash } from "#redux/flash/flash.actions";
import { setCurrentUser } from "#redux/user/user.actions";
import { connect } from "react-redux";
import { FaFacebook } from "react-icons/fa6";
import styles from "./facebook-login-button.module.scss";
import { useEffect } from "react";
import { FacebookAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const provider = new FacebookAuthProvider();
const auth = getAuth();

function ConnectedFaceBookLoginButton() {
  const handleFacebookLogin = async () => {
    if (!import.meta.env.PROD) {
      pushFlash({
        message: "Facebook login is not available in development mode",
        type: "warning",
      });
      return;
    }
    auth.useDeviceLanguage();
    try {
      const res = await signInWithPopup(auth, provider);
      console.log({ res });
    } catch (facebookLoginError) {
      console.log({ facebookLoginError });
    }
  };
  return (
    <button className={styles["fb-login-button"]} onClick={handleFacebookLogin}>
      <FaFacebook color="#1877f2" className={styles.icon} />
    </button>
  );
}

const FaceBookLoginButton = connect(null, { pushFlash, setCurrentUser })(
  ConnectedFaceBookLoginButton
);
export default FaceBookLoginButton;
