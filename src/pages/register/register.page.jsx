import styles from "./register.page.module.scss";
import CustomButton from "#components/custom-button/custom-button";
import CustomInput from "#components/custom-input/custom-input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import FormLayout from "#components/form-layout/form-layout";
import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <div className={styles.registerPage}>
      <FormLayout image="/images/graphics/registration-hero.png">
        <div className={styles.formContainer}>
          <img
            className="_form_logo"
            src="/images/logos/loger-logo-large.png"
            alt="loger"
          />
          <h2>Log In</h2>
          <form>
            <div className={styles.inputGroup}>
              <CustomInput placeholder="user name" label="User Name" />
              <CustomInput placeholder="8899889988" label="Contact Number" />
            </div>
            <CustomInput
              placeholder="name@example.com"
              label="Enter Your Email Address"
            />
            <div className={styles.inputGroup}>
              <CustomInput
                placeholder="atleast 8 characters"
                type="password"
                label="Password"
              />
              <CustomInput
                placeholder="same as password"
                type="password"
                label="Confirm Password"
              />
            </div>
            <CustomButton>Register</CustomButton>
            <Link to="/auth/login" className={styles.loginLink}>
              Already Have an Account? <span>Try Log In</span>
            </Link>
          </form>
        </div>
      </FormLayout>
    </div>
  );
}

export default RegisterPage;
