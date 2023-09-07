import styles from "./reviews.page.module.scss";

import CustomButton from "#components/custom-button/custom-button";
import Reviews from "#components/reviews/reviews";
import { useReviewWindow } from "#contexts/review-window.context";
function ReviewsPage() {
  const { openReviewWindow } = useReviewWindow();
  return (
    <div className={styles.reviewsPage}>
      <div className={styles.head}>
        <h2>My Reviews</h2>
        <CustomButton fit onClick={openReviewWindow}>
          Write Review
        </CustomButton>
      </div>
      <div className={styles.container}>
        <Reviews />
      </div>
    </div>
  );
}

export default ReviewsPage;
