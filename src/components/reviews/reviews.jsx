import styles from "./reviews.module.scss";

import RatingBar from "#components/review-bar/rating-bar";
import UserReviewCard from "#components/user-review-card/user-review-card";
import Balancer from "react-wrap-balancer";
import CustomButton from "#components/custom-button/custom-button";
import { BsArrowRight } from "react-icons/bs";
import { useState } from "react";
import { totalReviews } from "#utils/calculate-review-msg";
import Stars from "#components/stars/stars";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import api from "#api/index";
import LoadingPage from "#pages/loading/loading";
import { TbMoodEmpty } from "react-icons/tb";
const barColors = {
  5: {
    filledColor: "#00C964",
    emptyColor: "#E6FAF0",
  },
  4: {
    filledColor: "#0868F8",
    emptyColor: "#E7F0FF",
  },
  3: {
    filledColor: "#FCBB06",
    emptyColor: "#FFF9E7",
  },
  2: {
    filledColor: "#F87B08",
    emptyColor: "#FFF2E7",
  },
  1: {
    filledColor: "#1A232F",
    emptyColor: "#E9E9EB",
  },
};

Reviews.propTypes = {
  property: PropTypes.object,
};

function Reviews({ property }) {
  const totalRating = property?.ratings ? totalReviews(property?.ratings) : 0;
  const [currentUserReviewPage, setCurrentUserReviewPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const nextReviewPage = () => {
    setCurrentUserReviewPage((prevState) => prevState + 1);
  };

  const prevReviewPage = () => {
    setCurrentUserReviewPage((prevState) => prevState - 1);
  };

  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reviews", property?._id, currentUserReviewPage],
    enabled: !!property?._id,
    queryFn: async () => {
      const res = await api.get(
        `/review/${property?._id}?page=${currentUserReviewPage}&limit=4&status=active`
      );
      if (res?.data?.totalPages) setTotalPages(res?.data?.totalPages);
      return res?.data?.reviews;
    },
  });

  console.log({ reviews });

  return (
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className={styles.reviewContainer}>
          <div className={styles.left}>
            <div className={styles.ratingsContainer}>
              <h3>Reviews</h3>
              <div className={styles.rating}>
                <h2>{property?.averageRating}</h2>
                <div className={styles.ratingInfo}>
                  <p>
                    Out of <br />5 Star
                  </p>
                  <Stars ratings={property?.averageRating} />
                </div>
              </div>
            </div>
            <div className={styles.ratingGraph}>
              {property?.ratings &&
                Object?.keys(property?.ratings).map((rating) => (
                  <RatingBar
                    key={`${rating}-stars`}
                    ratingDetails={{
                      count: property?.ratings[rating],
                      totalCount: totalRating,
                      name: `${rating} Stars`,
                      filledColor: barColors[rating]?.filledColor,
                      emptyColor: barColors[rating]?.emptyColor,
                    }}
                  />
                ))}
            </div>
          </div>
          <div className={styles.right}>
            <h3 style={{ fontWeight: 900 }}>Reviews</h3>
            <p>
              <Balancer>
                Discover the essence of hospitality through our Review Section.
                Explore a collection of firsthand experiences shared by our
                valued guests. From cozy retreats to urban escapes, read
                insightful reviews that capture the spirit of each
                accommodation. Immerse yourself in tales of comfort, exceptional
                service, and memorable adventures, guiding you to make informed
                decisions for your next getaway. Your journey begins with the
                stories told by those who&apos;ve embraced the warmth of our
                accommodations.
              </Balancer>
            </p>
          </div>
        </div>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "200px",
              width: "100%",
              background: "lightgray",
            }}
          >
            <LoadingPage.Loader />
          </div>
        ) : error ? (
          <div>
            <TbMoodEmpty style={{ fontSize: "200px", color: "lightgray" }} />
            <h2 style={{ fontWeight: 900, color: "lightgray" }}>
              Error While Fetching Reviews!
            </h2>
          </div>
        ) : !reviews?.length ? (
          <>
            <TbMoodEmpty style={{ fontSize: "200px", color: "lightgray" }} />
            <h2 style={{ fontWeight: 900, color: "lightgray" }}>
              No Reviews Found!
            </h2>
          </>
        ) : (
          <div className={styles.userReviewsContainer}>
            <div className={styles.head}>
              <h2 style={{ fontWeight: 900 }}>
                See What Guests Loved the Most:
              </h2>
              <CustomButton fit>View All</CustomButton>
            </div>
            <div className={styles.userReviews}>
              {reviews?.map((review) => (
                <UserReviewCard key={review._id} review={review} />
              ))}
            </div>
            <div className={styles.reviewNav}>
              <button
                disabled={currentUserReviewPage <= 1}
                className={`${styles.arrowContainer} ${
                  currentUserReviewPage <= 1 ? styles.disabled : ""
                }`}
                onClick={prevReviewPage}
              >
                <BsArrowRight className={styles.arrow} />
              </button>
              <div className={styles.pages}>
                <p>
                  <span className={`${styles.page} ${styles.active}`}>
                    {currentUserReviewPage}
                  </span>
                  <span> of {totalPages} Pages</span>
                </p>
              </div>
              <button
                disabled={currentUserReviewPage >= totalPages}
                className={`${styles.arrowContainer} ${
                  currentUserReviewPage >= totalPages ? styles.disabled : ""
                }`}
                onClick={nextReviewPage}
              >
                <BsArrowRight className={styles.arrow} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reviews;
