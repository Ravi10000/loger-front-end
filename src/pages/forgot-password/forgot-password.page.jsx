import styles from "./forgot-password.page.module.scss";
import CustomButton from "#components/custom-button/custom-button";
import CustomInput from "#components/custom-input/custom-input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import FormLayout from "#components/form-layout/form-layout";
import { Link } from "react-router-dom";
import { CgArrowLeft } from "react-icons/cg";

function ForgotPasswordPage() {
  return (
    <div className={styles.forgotPassword}>
      <FormLayout image="/images/graphics/change-password-hero.png">
        <div className={styles.formContainer}>
          <img
            className="_form_logo"
            src="/images/logos/loger-logo-large.png"
            alt="loger"
          />
          <h2>Forgot Password ?</h2>
          <form>
            <CustomInput
              placeholder="name@example.com"
              label="Enter Email Address"
            />

            <CustomButton>Reset Password</CustomButton>
            <Link to="/auth/login" className={styles.loginLink}>
              <CgArrowLeft className={styles.backIcon} />
              Back to Log In
            </Link>
          </form>
        </div>
      </FormLayout>
    </div>
  );
}

export default ForgotPasswordPage;
