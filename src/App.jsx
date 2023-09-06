import styles from "./App.module.scss";
import { Suspense, lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Header from "#components/header/header";
import Footer from "#components/footer/footer";
import { useAuthWindow } from "#contexts/auth-window-context";
import SigninWindow from "#components/signin-window/signin-window";
import SignupWindow from "#components/signup-window/signup-window";

import LoadingPage from "#pages/loading/loading";
const SearchResultsPage = lazy(() =>
  import("#pages/search-results/search-results.page")
);
const HomePage = lazy(() => import("#pages/home/home.page"));
const LoginPage = lazy(() => import("#pages/login/login.page"));
const ForgotPasswordPage = lazy(() =>
  import("#pages/forgot-password/forgot-password.page")
);
const RegisterPage = lazy(() => import("#pages/register/register.page"));
const PropertyPage = lazy(() => import("#pages/property/property.page"));
const VerifyEmailPage = lazy(() =>
  import("#pages/verify-email/verify-email.page")
);
const CheckoutPage = lazy(() => import("#pages/checkout/checkout.page"));
const AboutPage = lazy(() => import("#pages/about/about.page"));
const ContactPage = lazy(() => import("#pages/contact/contact.page"));
const TermsPage = lazy(() => import("#pages/terms/terms.page"));
const FaqPage = lazy(() => import("#pages/faq/faq.page"));
const BookingDetailsPage = lazy(() =>
  import("#pages/booking-details/booking-details.page")
);

import ScrollTop from "#hooks/scroll-to-top";
function App() {
  const { pathname } = useLocation();
  const isAuthRoute = pathname.includes("/auth");
  const { authWindow } = useAuthWindow();
  console.log({ authWindow });
  return (
    <div className={styles.App}>
      <ScrollTop />
      {authWindow === "signin" && <SigninWindow />}
      {authWindow === "signup" && <SignupWindow />}
      {!isAuthRoute && <Header />}

      <div className={styles.page}>
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
            <Route path="/search-results" element={<SearchResultsPage />} />
            <Route path="/property" element={<PropertyPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/booking-details" element={<BookingDetailsPage />} />
            <Route path="/faqs" element={<FaqPage />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

export default App;
