import styles from "./App.module.scss";
import { Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "#components/header/header";
import LoadingPage from "#pages/loading/loading";
import PropertyCarousel from "#components/property-carousel/property-carousel";

const HomePage = lazy(() => import("#pages/home/home.page"));
const LoginPage = lazy(() => import("#pages/login/login.page"));
const ForgotPasswordPage = lazy(() =>
  import("#pages/forgot-password/forgot-password.page")
);
const RegisterPage = lazy(() => import("#pages/register/register.page"));
const VerifyEmailPage = lazy(() =>
  import("#pages/verify-email/verify-email.page")
);
function App() {
  const { pathname } = useLocation();
  const isAuthRoute = pathname.includes("/auth");
  console.log({ pathname });
  return (
    <div className={styles.App}>
      {!isAuthRoute && <Header />}

      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route
            path="/auth/forgot-password"
            element={<ForgotPasswordPage />}
          />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
