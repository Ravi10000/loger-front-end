import styles from "./review-popup.module.scss";

import { useState } from "react";
import { AiOutlineStar, AiFillStar, AiOutlineClose } from "react-icons/ai";
import { VscChromeClose } from "react-icons/vsc";
import WithBackdrop from "#components/with-backdrop/with-backdrop";
import CustomButton from "#components/custom-button/custom-button";
import Textbox from "#components/textbox/textbox";
import { useReviewWindow } from "#contexts/review-window.context";

function ReviewPopup() {
  const { isReviewWindowOpen } = useReviewWindow();
  const [rating, setRating] = useState(0);
  const { closeReviewWindow } = useReviewWindow();
  return (
    <>
      {isReviewWindowOpen && (
        <WithBackdrop>
          <div className={styles.reviewPopup}>
            <button className={styles.closeBtn} onClick={closeReviewWindow}>
              <VscChromeClose className={styles.icon} />
            </button>
            <h3>Leave a Review</h3>
            <div className={styles.rating}>
              {Array(5)
                .fill()
                .map((_, i) => {
                  const ratingValue = i + 1;
                  return ratingValue <= rating ? (
                    <AiFillStar
                      className={`${styles.icon} ${styles.filled}`}
                      onClick={() => setRating(ratingValue)}
                    />
                  ) : (
                    <AiOutlineStar
                      className={styles.icon}
                      onClick={() => setRating(ratingValue)}
                    />
                  );
                })}
            </div>
            <div className={styles.userInfo}>
              <img src="/images/user-circle.png" alt="user" />
              <div className={styles.name}>
                <h4>Alexander Parker</h4>
                <p>Posting Publicly</p>
              </div>
            </div>
            <Textbox placeholder="Write Something..." />
            <CustomButton
              onClick={() => {
                closeReviewWindow();
              }}
            >
              Save
            </CustomButton>
          </div>
        </WithBackdrop>
      )}
    </>
  );
}

export default ReviewPopup;
