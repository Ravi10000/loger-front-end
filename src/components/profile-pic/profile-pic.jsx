import styles from "./profile-pic.module.scss";
import PropTypes from "prop-types";

ProfilePic.propTypes = {
  user: PropTypes.object,
};

function ProfilePic({ user }) {
  return (
    <div
      className={styles.profilePicContainer}
      style={
        user?.profilePic
          ? {
              backgroundImage: `url("${
                import.meta.env.VITE_SERVER_URL
              }/images/${user?.profilePic}")`,
            }
          : {}
      }
    >
      {!user?.profilePic &&
        user?.fName?.charAt?.(0) + " " + user?.lName?.chatAt?.(0)}
    </div>
  );
}

export default ProfilePic;
