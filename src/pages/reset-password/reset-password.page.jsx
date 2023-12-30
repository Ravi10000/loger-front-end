import styles from "./reset-password.module.scss";
import CustomInput from "#components/custom-input/custom-input";
import { useParams, useNavigate } from "react-router-dom";
import CustomButton from "#components/custom-button/custom-button";
import { MdLockReset } from "react-icons/md";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import LoadingPage from "#pages/loading/loading";
import { Link } from "react-router-dom";
import { resetPassword } from "#api/auth.req";
import { pushFlash } from "#redux/flash/flash.actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useEffect } from "react";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .nonempty({ message: "Password required" })
      .min(8, { message: "Password should be atleast 8 characters" })
      .max(32, { message: "Password should be atmost 32 characters" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        {
          message:
            "Password should contain atleast one uppercase, one lowercase, one number and one special character",
        }
      ),
    confirmPassword: z.string().nonempty({
      message: "confirm password required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords do not match",
    path: ["confirmPassword"],
  });

ConnectedResetPasswordPage.propTypes = {
  pushFlash: PropTypes.func,
};

function ConnectedResetPasswordPage({ pushFlash }) {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    if (requestId?.length !== 24) navigate("/");
  }, [requestId, navigate]);

  const { mutate, status } = useMutation({
    mutationFn: async (data) => {
      console.log({ data });
      const res = await resetPassword({ password: data.password, requestId });
      console.log({ res });
      if (res?.data?.status === "success")
        pushFlash({
          type: "success",
          message: "Password reset successfully",
        });
      navigate("/reset-password-success", { state: { resetPassword: true } });
    },
    onError: (err) => {
      console.log({ err });
      pushFlash({
        type: "error",
        message: "Something went wrong",
      });
    },
  });

  return (
    <div className={styles.resetPasswordPage}>
      <Link to="/">
        <img src="/images/logos/loger-logo.png" />
      </Link>
      <h1>
        <MdLockReset />
        <span>Reset Password</span>
      </h1>
      <form className={styles.inputsContainer} onSubmit={handleSubmit(mutate)}>
        <CustomInput
          placeholder="password"
          type="password"
          autoComplete="new-password"
          register={{ ...register("password") }}
          error={errors?.password?.message}
        />
        <CustomInput
          placeholder="confirm password"
          type="password"
          autoComplete="new-password"
          register={{ ...register("confirmPassword") }}
          error={errors?.confirmPassword?.message}
        />
        <CustomButton disabled={status === "loading"}>
          <span>Save Password</span>
          {status === "pending" && (
            <LoadingPage.Loader style={{ fontSize: "16px", color: "#fff" }} />
          )}
        </CustomButton>
      </form>
    </div>
  );
}

const ResetPasswordPage = connect(null, { pushFlash })(
  ConnectedResetPasswordPage
);

export default ResetPasswordPage;
