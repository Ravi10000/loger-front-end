import styles from "./rating-bar.module.scss";

function RatingBar({ ratingDetails }) {
  const percentage = (ratingDetails?.count * 100) / ratingDetails?.totalCount;
  return (
    <div className={styles.ratingBar}>
      <p>{ratingDetails?.name}</p>
      <div className={styles.barContainer}>
        <div
          className={`${styles.filled} ${styles.bar}`}
          style={{
            width: `${percentage}%`,
            backgroundColor: ratingDetails?.filledColor || "#1A232F",
          }}
        ></div>
        <div
          className={`${styles.empty} ${styles.bar}`}
          style={{
            width: `${100 - percentage}%`,
            backgroundColor: ratingDetails?.emptyColor || "#E9E9EB",
          }}
        ></div>
      </div>
      <p>{ratingDetails?.count}</p>
    </div>
  );
}

export default RatingBar;
