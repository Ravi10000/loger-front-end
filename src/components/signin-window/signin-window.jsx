import styles from "./signin-window.module.scss";
import WithBackdrop from "#components/with-backdrop/with-backdrop";
import CustomButton from "#components/custom-button/custom-button";
import CustomInput from "#components/custom-input/custom-input";
import { useEffect, useRef } from "react";
import { useAuthWindow } from "#contexts/auth-window.context";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { loginWithEmail } from "#api/auth.req";
import { setCurrentUser } from "#redux/user/user.actions";
import { pushFlash } from "#redux/flash/flash.actions";
import { connect } from "react-redux";
import { setAuthToken } from "#api/index";
// import GoogleAuthButton from "#components/google-auth-button/google-auth-button";

const schema = z.object({
  email: z.string().email({ message: "invalid email" }),
  password: z.string().min(1, { message: "password required" }),
});

function SigninWindow({ setCurrentUser, pushFlash }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "email@admin51.com",
      password: "Password123@",
    },
  });

  const mutation = useMutation({
    mutationKey: ["user", "login"],
    mutationFn: async (data) => {
      console.log({ data });
      const response = await loginWithEmail(data);
      return response;
    },
    onSuccess: ({ data }) => {
      setCurrentUser(data?.user);
      setAuthToken(data?.accessToken);
      pushFlash({ message: "Login Successfull", type: "success" });
      closeAuthWindow();
    },
    onError: ({ response: { data } }) => {
      console.error({ error: data });
      pushFlash({ message: data?.message, type: "error" });
    },
  });

  const popupRef = useRef(null);
  const { closeAuthWindow, openAuthWindow } = useAuthWindow();
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target))
        closeAuthWindow();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);
  return (
    <WithBackdrop>
      <div ref={popupRef} className={styles.signinWindow}>
        <div className={styles.heading}>
          <h2>Welcome to Loger.ma</h2>
          <p>Login & Find Your Hotel Near Best Location</p>
        </div>
        <div className={styles.icons}>
          <div className={styles.iconContainer}>
            <img src="/images/icons/phone.png" alt="phone" />
          </div>
          <div className={styles.iconContainer}>
            <img src="/images/icons/facebook.png" alt="facebook" />
          </div>
          {/* <div className={styles.iconContainer}>
            <img src="/images/icons/google.png" alt="google" />
          </div> */}
          {/* <GoogleAuthButton /> */}
        </div>
        <div className={styles.seperator}>
          <p>or</p>
        </div>
        <form
          id="signin-form"
          onSubmit={handleSubmit(mutation.mutate)}
          className={styles.inputsNforgotPassword}
        >
          <div className={styles.inputsContainer}>
            <CustomInput
              placeholder="example@email.com"
              register={{ ...register("email") }}
              error={errors?.email?.message}
            />
            <CustomInput
              placeholder="password"
              type="password"
              register={{ ...register("password") }}
              error={errors?.password?.message}
            />
          </div>
          <p>Forgot Password?</p>
        </form>
        <div className={styles.buttonContainer}>
          <CustomButton form="signin-form">Signin</CustomButton>
        </div>
        <p className={styles.link} onClick={() => openAuthWindow("signup")}>
          Signup
        </p>
        <p>
          By continuing you agree Loger.ma{" "}
          <span className={styles.link}>
            Terms of Services & Privacy Policy
          </span>
        </p>
      </div>
    </WithBackdrop>
  );
}

export default connect(null, { setCurrentUser, pushFlash })(SigninWindow);
