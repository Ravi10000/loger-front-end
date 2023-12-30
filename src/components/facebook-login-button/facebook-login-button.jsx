import { pushFlash } from "#redux/flash/flash.actions";
import { setCurrentUser } from "#redux/user/user.actions";
import { connect } from "react-redux";
import { FaFacebook } from "react-icons/fa6";
import styles from "./facebook-login-button.module.scss";
// import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth } from "#firebase/firebase.config";
import PropTypes from "prop-types";
// const provider = new FacebookAuthProvider();

ConnectedFaceBookLoginButton.propTypes = {
  pushFlash: PropTypes.func,
  setCurrentUser: PropTypes.func,
};
function ConnectedFaceBookLoginButton({ pushFlash, setCurrentUser }) {
  const handleFacebookLogin = async () => {
    return pushFlash({
      type: "warning",
      message: "Facebook login is not available at the moment",
    });
    // if (!import.meta.env.PROD) {
    //   pushFlash({
    //     message: "Facebook login is not available in development mode",
    //     type: "warning",
    //   });
    //   return;
    // }
    // try {
    //   const res = await signInWithPopup(auth, provider);
    //   console.log({ res });
    // } catch (facebookLoginError) {
    //   console.log({ facebookLoginError });
    // }
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
