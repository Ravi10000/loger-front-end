import { useAuthWindow } from "#contexts/auth-window.context";
import { Suspense, useEffect } from "react";
import SigninWindow from "./signin-window/signin-window";
import SignupWindow from "./signup-window/signup-window";
import { connect } from "react-redux";
import PropTypes from "prop-types";

ConnectedAuthWindow.propTypes = {
  currentUser: PropTypes.object,
};
function ConnectedAuthWindow({ currentUser }) {
  const { authWindow, closeAuthWindow } = useAuthWindow();
  useEffect(() => {
    if (currentUser) {
      closeAuthWindow();
    }
  }, [currentUser, closeAuthWindow]);
  return (
    <Suspense fallback="">
      {authWindow.type === "signin" ? (
        <SigninWindow />
      ) : authWindow.type === "signup" ? (
        <SignupWindow />
      ) : null}
    </Suspense>
  );
}
const mapState = ({ user }) => ({ currentUser: user.currentUser });
const AuthWindow = connect(mapState)(ConnectedAuthWindow);
export default AuthWindow;
