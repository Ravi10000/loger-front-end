import styles from "./change-password.module.scss";
import CustomButton from "#components/custom-button/custom-button";
import CustomInput from "#components/custom-input/custom-input";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "#api/user.req";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { pushFlash } from "#redux/flash/flash.actions";
import { connect } from "react-redux";
const schema = z
  .object({
    currentPassword: z.string().nonempty({ message: "password required" }),
    newPassword: z
      .string()
      .nonempty({ message: "New Password required" })
      .min(8, { message: "Password should be atleast 8 characters" })
      .max(32, { message: "Password should be atmost 32 characters" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        {
          message:
            "Password should contain atleast one uppercase, one lowercase, one number and one special character",
        }
      ),
    confirmNewPassword: z.string().nonempty({
      message: "confirm new password",
    }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "passwords do not match",
    path: ["confirmNewPassword"],
  });

function ChangePassword({ pushFlash }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const passwordMutation = useMutation({
    mutationFn: async (data) => {
      const { currentPassword, newPassword } = data;
      const response = await changePassword({ currentPassword, newPassword });
      return response?.data;
    },
    onError: (error) => {
      console.log({ error });
      if (error?.response?.data?.message === "incorrect password") {
        pushFlash({
          type: "error",
          message: "Incorrect Current Password",
        });
      }
    },
    onSuccess: (data) => {
      console.log({ data });
      pushFlash({
        type: "success",
        message: "Password Changed Successfully",
      });
    },
  });

  return (
    <form
      className={styles.changePassword}
      onSubmit={handleSubmit(passwordMutation.mutate)}
    >
      <CustomInput
        bold
        label="Current Password"
        placeholder="Current Password"
        type="password"
        register={{ ...register("currentPassword") }}
        error={errors?.currentPassword?.message}
      />
      <div className={styles.inputGroup}>
        <CustomInput
          bold
          label="New Password"
          placeholder="New Password"
          type="password"
          register={{ ...register("newPassword") }}
          error={errors?.newPassword?.message}
        />
        <CustomInput
          bold
          label="Confirm New Password"
          placeholder="New Password"
          type="password"
          register={{ ...register("confirmNewPassword") }}
          error={errors?.confirmNewPassword?.message}
        />
      </div>
      <CustomButton>Save</CustomButton>
    </form>
  );
}

export default connect(null, { pushFlash })(ChangePassword);
