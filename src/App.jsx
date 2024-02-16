import styles from "./App.module.scss";
import firebaseApp from "#firebase/firebase.config";
import { Suspense, lazy } from "react";
import {
  Navigate,
  Route,
  Routes,
  // useLocation,
  // useSearchParams,
} from "react-router-dom";

// import { connect } from "react-redux";
// import { useQuery } from "@tanstack/react-query";
// import { fetchUserDetails } from "#api/auth.req";
// import { clearIsFetching, setCurrentUser } from "#redux/user/user.actions";

import Header from "#components/header/header";
import Footer from "#components/footer/footer";
import LoadingPage from "#pages/loading/loading";
// import ScrollTop from "#hooks/scroll-to-top";
import AuthWindow from "#components/auth-window";
import ReviewPopup from "#components/review-popup/review-popup";
import FlashGroup from "#components/flash-group/flash-group";
import ScrollToTop from "#components/scrollToTop";
import useFetchUser from "#hooks/fetch-user";
import WithShouldMount from "#components/withShouldMount";
import ResetPasswordPage from "#pages/reset-password/reset-password.page";
import ResetPasswordSuccessPage from "#pages/reset-password-success/reset-password-success.page";
import { useQueryClient } from "@tanstack/react-query";
const EmailVerified = lazy(() =>
  import("#pages/email-verified/email-verified")
);

const SearchResultsPage = lazy(() =>
  import("#pages/search-results/search-results.page")
);
const HomePage = lazy(() => import("#pages/home/home.page"));
// const LoginPage = lazy(() => import("#pages/login/login.page"));
// const ForgotPasswordPage = lazy(() =>
//   import("#pages/forgot-password/forgot-password.page")
// );
// const RegisterPage = lazy(() => import("#pages/register/register.page"));
const VerifyEmailPage = lazy(() =>
  import("#pages/verify-email/verify-email.page")
);
const PropertyPage = lazy(() => import("#pages/property/property.page"));
const CheckoutPage = lazy(() => import("#pages/checkout/checkout.page"));
const AboutPage = lazy(() => import("#pages/about/about.page"));
const ContactPage = lazy(() => import("#pages/contact/contact.page"));
const TermsPage = lazy(() => import("#pages/terms/terms.page"));
const FaqPage = lazy(() => import("#pages/faq/faq.page"));
const WorkPage = lazy(() => import("#pages/work/work.page"));
const MyTripsPage = lazy(() => import("#pages/my-trips/my-trips.page"));
const ReviewsPage = lazy(() => import("#pages/reviews/reviews.page"));
const RefferalPage = lazy(() => import("#pages/referral/refferal.page"));
const WalletPage = lazy(() => import("#pages/wallet/wallet.page"));
const WishlistPage = lazy(() => import("#pages/wishlist/wishlist.page"));
const ManageAccountPage = lazy(() =>
  import("#pages/manage-account/manage-account.page")
);
const AccountDetailsPage = lazy(() =>
  import("#pages/account-details/account-details.page")
);
const PrivacyPolicyPage = lazy(() =>
  import("#pages/privacy-policy/privacy-policy.page")
);
const BookingDetailsPage = lazy(() =>
  import("#pages/booking-details/booking-details.page")
);

function App() {
  console.count("render... <App />");
  useFetchUser();
  const client = useQueryClient();
  console.log({ client });
  console.log({ clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID });
  console.log({ clientSecret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET });

  return (
    <div className={styles.App}>
      <ScrollToTop />
      <FlashGroup />
      <ReviewPopup />
      <AuthWindow />
      {/* {!isAuthRoute && !pathname.includes("/booking-details") && <Header />} */}
      <WithShouldMount
        excludePathList={[
          "/auth",
          "/booking-details",
          "/verify-email",
          "/reset-password",
          "/email-verified",
        ]}
      >
        <Header />
      </WithShouldMount>

      <div className={styles.page}>
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/auth/login" element={<LoginPage />} /> */}
            {/* <Route
              path="/auth/forgot-password"
              element={<ForgotPasswordPage />}
            /> */}
            {/* <Route path="/auth/register" element={<RegisterPage />} /> */}
            <Route
              path="/verify-email/:requestId"
              element={<VerifyEmailPage />}
            />
            <Route path="/email-verified" element={<EmailVerified />} />
            <Route path="/search-results" element={<SearchResultsPage />} />
            <Route path="/property/:propertyId" element={<PropertyPage />} />
            <Route path="/checkout/:propertyId" element={<CheckoutPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route
              path="/booking-details/:transactionId"
              element={<BookingDetailsPage />}
            />
            <Route path="/faqs" element={<FaqPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/my-trips/:status" element={<MyTripsPage />} />
            <Route
              path="/my-trips"
              element={<Navigate to="/my-trips/upcomming" />}
            />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/refferal" element={<RefferalPage />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/account/:tab" element={<AccountDetailsPage />} />
            <Route path="/account" element={<ManageAccountPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route
              path="/reset-password/:requestId"
              element={<ResetPasswordPage />}
            />
            <Route
              path="/reset-password-success"
              element={<ResetPasswordSuccessPage />}
            />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </Suspense>
      </div>
      {/* {!pathname.includes("/booking-details") && <Footer />} */}
      <WithShouldMount
        excludePathList={[
          "/booking-details",
          "/verify-email",
          "/reset-password",
          "/email-verified",
        ]}
      >
        <Footer />
      </WithShouldMount>
    </div>
  );
}

// const mapState = (state) => ({
//   currentUser: state.user.currentUser,
//   isFetchingUser: state.user.isFetching,
// });
export default App;
