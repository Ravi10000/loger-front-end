import styles from "./verify-email.page.module.scss";

function VerifyEmailPage() {
  return (
    <div className={styles.verifyEmailPage}>
      <div className={styles.container}>
        <img src="/images/graphics/verify-hero.png" alt="verify email" />
        <p>
          Thanks for signup with us. Click on the button below to verify your
          email address.
        </p>
      </div>
    </div>
  );
}

export default VerifyEmailPage;
