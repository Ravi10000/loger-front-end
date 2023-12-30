import styles from "./forgot-password.module.scss";
import CustomInput from "#components/custom-input/custom-input";
import CustomButton from "#components/custom-button/custom-button";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import LoadingPage from "#pages/loading/loading";
import { generateResetPasswordRequest } from "#api/auth.req";
import { pushFlash } from "#redux/flash/flash.actions";
import { useState } from "react";
import { useAuthWindow } from "#contexts/auth-window.context";
import { Balancer } from "react-wrap-balancer";
import { MdLockReset } from "react-icons/md";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email Required")
    .email({ message: "Invalid email address" }),
});

function ForgotPassword() {
  const [isLinkSent, setIsLinkSent] = useState(false);
  const { openAuthWindow } = useAuthWindow();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const { mutate, status } = useMutation({
    mutationFn: async (data) => {
      console.log({ data });
      const res = await generateResetPasswordRequest(data);
      console.log({ res });
      if (res?.data?.status === "success")
        pushFlash({
          type: "success",
          message: "Reset password link sent to your email",
        });
      setIsLinkSent(true);
    },
    onError: (err) => {
      console.log({ err });
      pushFlash({
        type: "error",
        message: "Something went wrong",
      });
    },
  });

  if (!isLinkSent)
    return (
      <form className={styles.forgotPassword} onSubmit={handleSubmit(mutate)}>
        <h3>
          <MdLockReset />
          Reset Password
        </h3>
        <CustomInput
          placeholder="Enter your email address"
          register={{ ...register("email") }}
          error={errors?.email?.message}
        />
        <CustomButton fit disabled={status === "pending"}>
          <span>Send Reset password link</span>
          {status === "pending" && (
            <LoadingPage.Loader style={{ color: "#fff", fontSize: "14px" }} />
          )}
        </CustomButton>
      </form>
    );
  return (
    <div className={styles.linkSent}>
      <p>
        <Balancer>
          A reset password link sent to you via your email address.
        </Balancer>
      </p>
      <button
        className={styles.goToSignin}
        onClick={() => {
          openAuthWindow({ type: "signin", method: "email" });
        }}
      >
        Go to Sign in
      </button>
    </div>
  );
}

export default ForgotPassword;
