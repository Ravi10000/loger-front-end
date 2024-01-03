import styles from "./user-review-card.module.scss";

import { RiStarFill } from "react-icons/ri";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import ProfilePic from "#components/profile-pic/profile-pic";
UserReviewCard.propTypes = {
  review: PropTypes.object,
};

function UserReviewCard({ review }) {
  const { user } = review;
  const days = dayjs().diff(dayjs(review?.createdAt), "day");

  return (
    <div className={styles.userReviewCard}>
      <div className={styles.head}>
        <ProfilePic user={review?.user} />
        <div className={styles.userDetails}>
          <h3>
            {user.fName} {user.lName}
          </h3>
          {<p>{days > 0 ? `${days} days ago` : "Today"} </p>}
        </div>
        <div className={styles.stars}>
          {[...Array(review?.rating)].map((_, i) => (
            <RiStarFill key={i} className={styles.star} />
          ))}
        </div>
      </div>
      {!!review?.comment && (
        <p className={styles.reviewText}>{review?.comment}</p>
      )}
    </div>
  );
}

export default UserReviewCard;
