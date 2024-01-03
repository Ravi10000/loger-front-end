import styles from "./signin-email.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useMutation } from "@tanstack/react-query";
import { loginWithEmail } from "#api/auth.req";
import { setCurrentUser } from "#redux/user/user.actions";
import { setAuthToken } from "#api/index";
import { pushFlash } from "#redux/flash/flash.actions";
import { useAuthWindow } from "#contexts/auth-window.context";
import CustomInput from "#components/custom-input/custom-input";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CustomButton from "#components/custom-button/custom-button";
import LoadingPage from "#pages/loading/loading";
import { useState } from "react";
import EmailSent from "#components/email-sent-message/email-sent-message";

const schema = z.object({
  email: z.string().email({ message: "invalid email" }),
  password: z.string().min(1, { message: "password required" }),
});

ConnectedSigninEmail.propTypes = {
  setCurrentUser: PropTypes.func,
  pushFlash: PropTypes.func,
};

function ConnectedSigninEmail({ setCurrentUser, pushFlash }) {
  const { closeAuthWindow, openAuthWindow } = useAuthWindow();

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

  const { status, mutate } = useMutation({
    mutationKey: ["user", "login"],
    mutationFn: async (data) => {
      console.log({ data });
      const response = await loginWithEmail(data);
      return response;
    },
    onSuccess: ({ data }) => {
      setCurrentUser(data?.user);
      setAuthToken(data?.accessToken);
      pushFlash({ message: "Welcome to Loger.ma", type: "success" });
      closeAuthWindow();
    },
    onError: ({ response: { data } }) => {
      console.error({ error: data });
      if (data?.message === "verification link sent") {
        openAuthWindow({
          type: "signin",
          method: "emailSent",
        });
        return;
      }
      pushFlash({ message: data?.message, type: "error" });
    },
  });

  return (
    <>
      <form
        id="signin-email"
        onSubmit={handleSubmit(mutate)}
        className={styles.signInEmailForm}
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
        <p
          onClick={() => {
            openAuthWindow({
              type: "signin",
              method: "forgotPassword",
            });
          }}
        >
          forgot password?
        </p>
      </form>
      <div className={styles.buttonContainer}>
        <CustomButton form="signin-email" disabled={status === "pending"}>
          <span>Signin</span>
          {status === "pending" && (
            <LoadingPage.Loader style={{ fontSize: "16px", color: "#fff" }} />
          )}
        </CustomButton>
      </div>
    </>
  );
}

const SigninEmail = connect(null, { setCurrentUser, pushFlash })(
  ConnectedSigninEmail
);

// exporting it this way so that fast refresh works properly
export default SigninEmail;
