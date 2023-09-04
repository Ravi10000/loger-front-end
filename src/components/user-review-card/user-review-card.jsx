import styles from "./user-review-card.module.scss";

import { RiStarFill } from "react-icons/ri";

function UserReviewCard({ review }) {
  return (
    <div className={styles.userReviewCard}>
      <div className={styles.head}>
        <img src="/images/user-circle.png" alt="user" />
        <div className={styles.userDetails}>
          <h3>Ravinder Kumar</h3>
          <p>5 days ago</p>
        </div>
        <div className={styles.stars}>
          {[...Array(5)].map((_, i) => (
            <RiStarFill className={styles.star} />
          ))}
        </div>
      </div>
      <p className={styles.reviewText}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived{" "}
        <span>Read More...</span>
      </p>
    </div>
  );
}

export default UserReviewCard;
