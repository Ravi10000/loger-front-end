import styles from "./login.page.module.scss";
import CustomButton from "#components/custom-button/custom-button";
import CustomInput from "#components/custom-input/custom-input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import FormLayout from "#components/form-layout/form-layout";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className={styles.loginPage}>
      <FormLayout image="/images/graphics/login-hero.png">
        <div className={styles.formContainer}>
          <img
            className="_form_logo"
            src="/images/logos/loger-logo-large.png"
            alt="loger"
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
            <div className={styles.actionsContainer}>
              <CustomButton>Login</CustomButton>
              <Link
                to="/auth/forgot-password"
                className={styles.forgotPassword}
              >
                Forgot Password?
              </Link>
              <Link to="/auth/register" className={styles.registerLink}>
                Don't have an account? <span>Please Register</span>
              </Link>
            </div>
          </form>
        </div>
      </FormLayout>
    </div>
  );
}

export default LoginPage;
