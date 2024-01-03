import styles from "./verify-email.page.module.scss";
import { Balancer } from "react-wrap-balancer";
import { useMutation } from "@tanstack/react-query";
import api, { setAuthToken } from "#api/index";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LoadingPage from "#pages/loading/loading";
import { pushFlash } from "#redux/flash/flash.actions";
import { setCurrentUser } from "#redux/user/user.actions";
import { connect } from "react-redux";

function VerifyEmailPage({ pushFlash, setCurrentUser }) {
  const { requestId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (requestId?.length !== 24) {
      navigate("/", { replace: true });
    }
  }, [requestId, navigate]);

  const { mutate, status, error } = useMutation({
    mutationFn: async () => {
      const res = await api.post("/auth/verify-email", { requestId });
      console.log({ res });
      if (res?.data?.status === "success") {
        setCurrentUser(res?.data?.user);
        setAuthToken(res?.data?.accessToken);
      }
      navigate("/email-verified", {
        replace: true,
        state: { isRedirected: true },
      });
    },
    onError: (err) => {
      console.log({ err });
      pushFlash({ type: "error", message: err?.response?.data?.message });
    },
  });
  if (error) return <p>something went wrong...</p>;
  return (
    <div className={styles.verifyEmailPage}>
      <div className={styles.container}>
        <img src="/images/graphics/verify-hero.png" alt="verify email" />
        <p>
          <Balancer>
            Thanks for signup with us.
            <br /> Click on the button below to verify your email address.
          </Balancer>
        </p>
        <button
          className={styles.verifyBtn}
          disabled={status === "pending"}
          onClick={mutate}
        >
          <span>Verify My Account</span>
          {status === "pending" && (
            <LoadingPage.Loader style={{ fontSize: "14px" }} />
          )}
        </button>
      </div>
    </div>
  );
}

export default connect(null, { pushFlash, setCurrentUser })(VerifyEmailPage);
