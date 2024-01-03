import styles from "./email-verified.module.scss";
import { Balancer } from "react-wrap-balancer";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

function EmailVerified() {
  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    if (!state?.isRedirected) {
      navigate("/", { replace: true });
    }
  }, [state, navigate]);
  return (
    <div className={styles.verifyEmailPage}>
      <div className={styles.container}>
        <img src="/images/graphics/verify-hero.png" alt="verify email" />
        <p>
          <Balancer>
            Your Account has been verified.
            <br /> Click on the button below to go to home page.
          </Balancer>
        </p>
        <button
          className={styles.verifyBtn}
          onClick={() => {
            navigate("/");
          }}
        >
          Go to home page
        </button>
      </div>
    </div>
  );
}

export default EmailVerified;
