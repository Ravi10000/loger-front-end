import CustomButton from "#components/custom-button/custom-button";
import CustomInput from "#components/custom-input/custom-input";
import styles from "./login-form.module.scss";
import { Link } from "react-router-dom";

function LoginForm() {
  return (
    <div className={styles.loginForm}>
      <img
        className={styles.logo}
        src="/images/logos/loger-logo-large.png"
        alt="loger-logo"
      />
      <h2>Log In</h2>
      <form>
        <CustomInput
          placeholder="name@example.com"
          label="Enter Your Email Address"
        />
        <CustomInput
          placeholder="atleast 8 characters"
          type="password"
          label="Enter Your Password"
        />
        <CustomButton>Login</CustomButton>
      </form>
      <Link to="/forgot-password" className={styles.forgotPassword}>
        forgot password?
      </Link>
      <Link to="/register" className={styles.registerLink}>
        Don&apos;t have an account? <span>Please Registration</span>
      </Link>
    </div>
  );
}

export default LoginForm;
