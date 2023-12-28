import styles from "./reviews-slider.module.scss";
import PropTypes from "prop-types";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import WithBackdrop from "#components/with-backdrop/with-backdrop";
import useReviews from "#hooks/reviews-query";
import { useEffect, useState } from "react";
import UserReviewCard from "#components/user-review-card/user-review-card";
import LoadingPage from "#pages/loading/loading";
import { MdClose } from "react-icons/md";
// import { useQueryClient } from "@tanstack/react-query";

ReviewsSlider.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
  propertyId: PropTypes.string,
};

const visible = {
  opacity: 1,
  x: 0,
};
const hidden = {
  opacity: 0,
  x: 100,
};
function ReviewsSlider({ isOpen, close, propertyId }) {
  useLockBodyScroll();
  const [allReviews, setAllReviews] = useState([]);
  //   const queryClient = useQueryClient();
  const { reviews, isLoading, isFetching, nextPage, currentPage, totalPages } =
    useReviews({
      propertyId,
      limit: 10,
      invalidateFirst: true,
      onSuccess: (reviews) => {
        setAllReviews((ps) => [...ps, ...reviews]);
      },
    });

  //   useEffect(() => {
  //     queryClient.invalidateQueries(["reviews", [propertyId]]);
  //   }, []);
  useEffect(() => {
    console.log({ reviews, currentPage });
    if (currentPage === 1 && reviews?.length) {
      setAllReviews(reviews);
    }
  }, [reviews, currentPage]);

  console.log({ allReviews });
  if (!isOpen) return <></>;
  return (
    <WithBackdrop close={close}>
      <motion.div
        initial={hidden}
        exit={hidden}
        animate={visible}
        className={`${styles.reviewsSlider} ${
          isOpen ? styles.visible : styles.hidden
        }`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {isFetching && currentPage === 1 ? (
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LoadingPage.Loader />
          </div>
        ) : (
          <>
            <div className={styles.head}>
              <h2>All Reviews </h2>
              <button className={styles.closeBtn} onClick={close}>
                <span>Close</span> <MdClose />
              </button>
            </div>
            <div className={styles.reviewsContainer}>
              {allReviews?.map((review) => (
                <UserReviewCard key={review._id} review={review} />
              ))}
            </div>
            <div className={styles.buttonContainer}>
              {isLoading ? (
                <LoadingPage.Loader style={{ fontSize: "20px" }} />
              ) : currentPage >= totalPages ? (
                <p>you&apos;ve seen it all.</p>
              ) : (
                <button onClick={nextPage}>show more...</button>
              )}
            </div>
          </>
        )}
      </motion.div>
    </WithBackdrop>
  );
}

export default ReviewsSlider;
