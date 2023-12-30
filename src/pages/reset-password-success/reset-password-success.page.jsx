import { useEffect } from "react";
import styles from "./reset-password-success.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuthWindow } from "#contexts/auth-window.context";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
function ResetPasswordSuccessPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { openAuthWindow } = useAuthWindow();

  //   useEffect(() => {
  //     if (!state?.resetPassword) navigate("/");
  //   }, [state, navigate]);

  return (
    <div className={styles.successMessage}>
      <div className={styles.card}>
        {/* <Link to="/">
          <img className={styles.logo} src="/images/logos/loger-logo.png" />
        </Link> */}
        <div className={styles.iconContainer}>
          <IoCheckmarkDoneSharp className={styles.icon} />
        </div>
        <h2>Password changed Successfully</h2>
        <button
          className={styles.goToSignin}
          onClick={() => {
            openAuthWindow({ type: "signin", method: "email" });
            navigate("/");
          }}
        >
          Go to Sign in
        </button>
      </div>
    </div>
  );
}

export default ResetPasswordSuccessPage;
