import styles from "./header.module.scss";
import CurrencySelector from "#components/currency-selector/currency-selector";
import CountrySelector from "#components/country-selector/country-selector";
import CustomButton from "#components/custom-button/custom-button";
import { RiUserFill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { useAuthWindow } from "#contexts/auth-window.context";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import UserPopup from "#components/user-popup/user-popup";
import { connect } from "react-redux";
import PropTypes from "prop-types";

Header.propTypes = {
  currentUser: PropTypes.object,
};

function Header({ currentUser }) {
  const { openAuthWindow } = useAuthWindow();
  const { pathname } = useLocation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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
  const popupRef = useRef(null);
  const hideHeader = pathname?.includes("reset-password");
  console.log({ hideHeader, pathname });
  useEffect(() => {
    function handleClickOutside(e) {
      if (popupRef.current && !popupRef.current.contains(e.target))
        setIsPopupOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [popupRef]);

  return (
    <div
      className={`${styles.header} ${
        isSpecialRoutes ? styles.specialRoute : ""
      }`}
      style={hideHeader ? { display: "none" } : {}}
    >
      <div className={styles.container}>
        <Link to="/">
          <img className={styles.logo} src="/images/logos/loger-logo.png" />
        </Link>
        <div className={styles.actionsContainer}>
          <CurrencySelector />
          <img src="/images/icons/notification.svg" />
          <CountrySelector />
          {currentUser ? (
            <button
              ref={popupRef}
              onClick={() => {
                setIsPopupOpen((prevState) => !prevState);
              }}
              className={styles.accountButton}
            >
              <div
                className={styles.initials}
                style={{
                  ...(currentUser?.profilePic && {
                    backgroundImage: `url("${
                      import.meta.env.VITE_SERVER_URL
                    }/images/${currentUser?.profilePic}")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundColor: "transparent",
                  }),
                }}
              >
                {!currentUser?.profilePic && (
                  <p>{currentUser?.fName?.[0].toUpperCase()}</p>
                )}
              </div>
              <IoIosArrowDown
                className={`${styles.icon} ${isPopupOpen ? styles.flip : ""}`}
              />
              {isPopupOpen && <UserPopup close={() => setIsPopupOpen(false)} />}
            </button>
          ) : (
            <CustomButton rounded onClick={() => openAuthWindow()}>
              <RiUserFill />
              <p className={styles.signInText}>Sign In</p>
            </CustomButton>
          )}
        </div>
      </div>
    </div>
  );
}

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapState)(Header);
