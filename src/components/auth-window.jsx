import { useAuthWindow } from "#contexts/auth-window.context";
import { Suspense } from "react";
import SigninWindow from "./signin-window/signin-window";
import SignupWindow from "./signup-window/signup-window";

function AuthWindow() {
  const { authWindow } = useAuthWindow();
  return (
    <Suspense fallback="">
      {authWindow === "signin" ? (
        <SigninWindow />
      ) : authWindow === "signup" ? (
        <SignupWindow />
      ) : null}
    </Suspense>
  );
}

export default AuthWindow;
