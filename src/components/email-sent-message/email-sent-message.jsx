import styles from "./email-sent-message.module.scss";
import { useAuthWindow } from "#contexts/auth-window.context";
import { Balancer } from "react-wrap-balancer";
import { MdMarkEmailRead } from "react-icons/md";
import PropTypes from "prop-types";

EmailSent.propTypes = {
  showMsg: PropTypes.bool,
};
function EmailSent({ showMsg }) {
  const { openAuthWindow } = useAuthWindow();
  return (
    <div className={styles.emailSent}>
      <div className={styles.iconContainer}>
        <MdMarkEmailRead className={styles.icon} />
      </div>
      <p>
        {!!showMsg && "Thank you for registering on Loger.ma!"}
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

export default EmailSent;
