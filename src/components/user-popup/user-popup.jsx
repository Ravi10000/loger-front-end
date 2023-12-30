import { useNavigate } from "react-router-dom";
import styles from "./user-popup.module.scss";
import { HashLink } from "react-router-hash-link";
import { useRef } from "react";
import api, { removeAuthToken } from "#api/index";
import { connect } from "react-redux";
import { setCurrentUser } from "#redux/user/user.actions";
import { pushFlash } from "#redux/flash/flash.actions";
import PropTypes from "prop-types";

ConnectedUserPopup.propTypes = {
  setCurrentUser: PropTypes.func,
  currentUser: PropTypes.object,
  pushFlash: PropTypes.func,
};

function ConnectedUserPopup({ setCurrentUser, currentUser, pushFlash }) {
  const popupRef = useRef(null);
  const navigate = useNavigate();
  return (
    <div className={styles.userPopup} ref={popupRef}>
      <div className={styles.option} onClick={() => navigate("/account")}>
        <img src="/images/account-icons/user.svg" alt="user" />
        <div className={styles.innerText}>
          <p>Manage Account</p>
          <p>
            {currentUser?.email ||
              currentUser?.countryCode + " " + currentUser?.phone}
          </p>
        </div>
      </div>
      <div className={styles.option} onClick={() => navigate("/wishlist")}>
        <img src="/images/icons/heart.svg" alt="wishlist" />
        <div className={styles.innerText}>
          <p>
            My Wishlist
            {/* <span>04</span> */}
          </p>
        </div>
      </div>
      <div
        className={styles.option}
        onClick={() => navigate("/my-trips/upcomming")}
      >
        <img src="/images/icons/calender-2.svg" alt="bookings" />
        <div className={styles.innerText}>
          <p>
            My Trips
            {/* <span>01</span> */}
          </p>
        </div>
      </div>
      <div className={styles.option} onClick={() => navigate("/wallet")}>
        <img src="/images/account-icons/wallet-add.svg" alt="wallet" />
        <div className={styles.innerText}>
          <p>
            My Wallet
            {/* <span>250 Coins</span> */}
          </p>
        </div>
      </div>
      <HashLink to="/wallet/#payment-history" className={styles.option}>
        <img src="/images/account-icons/history.svg" alt="wishlist" />
        <div className={styles.innerText}>
          <p>Payment History</p>
        </div>
      </HashLink>
      <div className={styles.option} onClick={() => navigate("/refferal")}>
        <img src="/images/icons/refer.svg" alt="wishlist" />
        <div className={styles.innerText}>
          <p>Refer & Earn</p>
        </div>
      </div>
      <div
        className={styles.option}
        onClick={async () => {
          removeAuthToken();
          await setCurrentUser(null);
          api.defaults.headers.common["Authorization"] = null;
          // queryClient.invalidateQueries(["user"]);
          await pushFlash({ message: "Logout Successfull", type: "success" });
        }}
      >
        <img src="/images/icons/signout.svg" alt="wishlist" />
        <div className={styles.innerText}>
          <p>Signout</p>
        </div>
      </div>
    </div>
  );
}

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});
const UserPopup = connect(mapState, { setCurrentUser, pushFlash })(
  ConnectedUserPopup
);
export default UserPopup;
