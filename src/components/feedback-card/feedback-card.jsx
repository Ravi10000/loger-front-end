import styles from "./feedback-card.module.scss";
import { RiStarFill } from "react-icons/ri";

function FeedbackCard({ item }) {
  return (
    <div className={styles.feedbackCard}>
      <div className={styles.userImageContainer}>
        <img src={item?.image} alt="user" />
      </div>
      <div className={styles.feedbackInfo}>
        <img
          className={styles.quote}
          src="/images/icons/quote-opening.png"
          alt="quotes"
        />
        <div className={styles.heading}>
          <div className={styles.client}>
            <h3>{item?.name}</h3>
            <p>{item?.company}</p>
          </div>
          <div className={styles.rating}>
            <div className={styles.stars}>
              {Array(item?.rating)
                .fill()
                .map((_, i) => (
                  <RiStarFill key={i} className={styles.star} />
                ))}
            </div>
            <p>{item?.rating}.0</p>
          </div>
        </div>
        <div className={styles.content}>
          <h3>{item?.feedbackTitle}</h3>
          <p>{item?.feedbackText}</p>
        </div>
        {/* <img
          className={styles.quote}
          src="/images/icons/quote-closing.png"
          alt="quotes"
        /> */}
        <img
          className={styles.quote}
          src="/images/icons/quote-opening.png"
          alt="quotes"
        />
      </div>
    </div>
  );
}

export default FeedbackCard;
