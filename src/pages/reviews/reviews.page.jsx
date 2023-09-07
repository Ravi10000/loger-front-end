import styles from "./reviews.page.module.scss";

import CustomButton from "#components/custom-button/custom-button";
import Reviews from "#components/reviews/reviews";
function ReviewsPage() {
  return (
    <div className={styles.reviewsPage}>
      <div className={styles.head}>
        <h2>My Reviews</h2>
        <CustomButton fit>Write Review</CustomButton>
      </div>
      <div className={styles.container}>
        <Reviews />
      </div>
    </div>
  );
}

export default ReviewsPage;
