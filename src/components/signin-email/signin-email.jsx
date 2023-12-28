import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./signin-email.module.scss";
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

const schema = z.object({
  email: z.string().email({ message: "invalid email" }),
  password: z.string().min(1, { message: "password required" }),
});

ConnectedSigninEmail.propTypes = {
  setCurrentUser: PropTypes.func,
  pushFlash: PropTypes.func,
};

function ConnectedSigninEmail({ setCurrentUser, pushFlash }) {
  const { closeAuthWindow } = useAuthWindow();

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

  return (
    <>
      <form
        id="signin-email"
        onSubmit={handleSubmit(mutation.mutate)}
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
        <p>forgot password?</p>
      </form>
      <div className={styles.buttonContainer}>
        <CustomButton
          form="signin-email"
          disabled={mutation?.status === "pending"}
        >
          Signin
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
