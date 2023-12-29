import { pushFlash } from "#redux/flash/flash.actions";
import { setCurrentUser } from "#redux/user/user.actions";
import { connect } from "react-redux";
import { FaFacebook } from "react-icons/fa6";
import styles from "./facebook-login-button.module.scss";
import { useEffect } from "react";

const { FB } = window;
function ConnectedFaceBookLoginButton() {
  console.log({ FB });
  useEffect(() => {
    if (FB) {
      FB.getLoginStatus(function (response) {
        console.log({ response });
        // statusChangeCallback(response);
      });
    }
  }, []);
  return (
    <button className={styles["fb-login-button"]}>
      <FaFacebook color="#1877f2" className={styles.icon} />
    </button>
  );
}

const FaceBookLoginButton = connect(null, { pushFlash, setCurrentUser })(
  ConnectedFaceBookLoginButton
);
export default FaceBookLoginButton;
