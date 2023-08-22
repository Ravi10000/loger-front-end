import styles from "./header.module.scss";
import CurrencySelector from "#components/currency-selector/currency-selector";
import CountrySelector from "#components/country-selector/country-selector";
import CustomButton from "#components/custom-button/custom-button";
import { RiUserFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <img className={styles.logo} src="/images/logos/loger-logo.png" />

        <div className={styles.actionsContainer}>
          <CurrencySelector />
          <img src="/images/icons/notification.svg" />
          <CountrySelector />
          <CustomButton rounded onClick={() => navigate("/auth/login")}>
            <RiUserFill />
            <p>Sign In</p>
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

export default Header;
