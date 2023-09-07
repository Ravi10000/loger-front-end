import styles from "./header.module.scss";
import CurrencySelector from "#components/currency-selector/currency-selector";
import CountrySelector from "#components/country-selector/country-selector";
import CustomButton from "#components/custom-button/custom-button";
import { RiUserFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthWindow } from "#contexts/auth-window-context";

function Header() {
  const navigate = useNavigate();
  const { openAuthWindow } = useAuthWindow();
  const { pathname } = useLocation();
  const specialRoutes = [
    "/search-results",
    "/",
    "/about",
    "/contact",
    "/terms",
    "/faqs",
    "/work",
  ];
  const isSpecialRoutes = specialRoutes.includes(pathname);

  return (
    <div
      className={`${styles.header} ${
        isSpecialRoutes ? styles.specialRoute : ""
      }`}
    >
      <div className={styles.container}>
        <Link to="/">
          <img className={styles.logo} src="/images/logos/loger-logo.png" />
        </Link>
        <div className={styles.actionsContainer}>
          <CurrencySelector />
          <img src="/images/icons/notification.svg" />
          <CountrySelector />
          <CustomButton rounded onClick={() => openAuthWindow()}>
            <RiUserFill />
            <p>Sign In</p>
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

export default Header;
