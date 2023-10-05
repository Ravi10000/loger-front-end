import styles from "./App.module.scss";
import { Suspense, lazy, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Header from "#components/header/header";
import Footer from "#components/footer/footer";
import { useAuthWindow } from "#contexts/auth-window.context";
import SigninWindow from "#components/signin-window/signin-window";
import SignupWindow from "#components/signup-window/signup-window";

import LoadingPage from "#pages/loading/loading";
import ScrollTop from "#hooks/scroll-to-top";
import { useReviewWindow } from "#contexts/review-window.context";
import ReviewPopup from "#components/review-popup/review-popup";
import FlashGroup from "#components/flash-group/flash-group";
import { connect } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { fetchUserDetails } from "#api/auth.req";
import { clearIsFetching, setCurrentUser } from "#redux/user/user.actions";
import { getAuthToken, removeAuthToken } from "./api";

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

function App({ setCurrentUser, clearIsFetching }) {
  const { pathname } = useLocation();
  const isAuthRoute = pathname.includes("/auth");
  const { authWindow } = useAuthWindow();
  const { isReviewWindowOpen } = useReviewWindow();

  const userQuery = useQuery({
    queryKey: ["user"],
    enabled: getAuthToken() ? true : false,
    queryFn: async () => {
      const { data } = await fetchUserDetails();
      setCurrentUser(data.user);
      return data?.user;
    },
  });
  useEffect(() => {
    if (userQuery.isError) {
      clearIsFetching();
      // removeAuthToken();
    }
  }, [userQuery]);

  // useEffect(() => {
  //   if (userQuery?.isError) {
  //     clearIsFetching();
  //     setCurrentUser(null);
  //   } else if (userQuery?.isSuccess) {
  //     console.log("user query");
  //     setCurrentUser(userQuery.data);
  //   }
  // }, []);

  return (
    <div className={styles.App}>
      <ScrollTop />
      {/* <FlashGroup
        flashList={[
          {
            type: "success",
            message: "Hello",
          },
          {
            type: "error",
            message: "Hello",
          },
          {
            type: "warning",
            message: "Hello",
          },
          {
            type: "info",
            message: "Hello",
          },
        ]}
      /> */}
      <FlashGroup />
      {isReviewWindowOpen && <ReviewPopup />}
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
            <Route path="/work" element={<WorkPage />} />
            <Route path="/my-trips" element={<MyTripsPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/refferal" element={<RefferalPage />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/account/:tab" element={<AccountDetailsPage />} />
            <Route path="/account" element={<ManageAccountPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  isFetchingUser: state.user.isFetching,
});
export default connect(mapState, { setCurrentUser, clearIsFetching })(App);
