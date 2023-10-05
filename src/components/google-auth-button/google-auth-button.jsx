import { useMutation } from "@tanstack/react-query";
import styles from "./google-auth-button.module.scss";
import { useGoogleLogin, GoogleLogin } from "@react-oauth/google";
import { googleSignIn } from "#api/auth.req";
function GoogleAuthButton() {
  const mutation = useMutation({
    mutationFn: async (creds) => {
      const res = await googleSignIn(creds);
      return res.data;
    },
    onSuccess: (data) => {
      console.log({ data });
    },
    onError: (error) => {
      console.error({ error });
    },
  });

  const login = useGoogleLogin({
    onSuccess: mutation.mutate,
    flow: "auth-code",
  });
  return (
    // <div className={styles.iconContainer} onClick={login}>
    //   <img src="/images/icons/google.png" alt="google" />
    // </div>
    <GoogleLogin
      //   shape="square"
      onSuccess={mutation.mutate}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
}

export default GoogleAuthButton;
