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

  const nextReviewPage = () => {
    if (currentUserReviewPage < 5) {
      setCurrentUserReviewPage((prevState) => prevState + 1);
    }
  };
  const prevReviewPage = () => {
    if (currentUserReviewPage > 0) {
      setCurrentUserReviewPage((prevState) => prevState - 1);
    }
  };

  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reviews", property?._id, currentUserReviewPage],
    enabled: !!property?._id,
    queryFn: async () => {
      const res = await api.get(`/review/${property?._id}`);
      console.log({ res });
      return res?.data?.reviews;
    },
  });

  console.log({ reviews });

  return (
    <div className={styles.container}>
      {isLoading ? (
        <LoadingPage.Loader />
      ) : !reviews?.length ? (
        <>
          <TbMoodEmpty style={{ fontSize: "200px", color: "lightgray" }} />
          <h2 style={{ fontWeight: 900, color: "lightgray" }}>
            No Reviews Found!
          </h2>
        </>
      ) : (
        <>
          {" "}
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
                  Discover the essence of hospitality through our Review
                  Section. Explore a collection of firsthand experiences shared
                  by our valued guests. From cozy retreats to urban escapes,
                  read insightful reviews that capture the spirit of each
                  accommodation. Immerse yourself in tales of comfort,
                  exceptional service, and memorable adventures, guiding you to
                  make informed decisions for your next getaway. Your journey
                  begins with the stories told by those who&apos;ve embraced the
                  warmth of our accommodations.
                </Balancer>
              </p>
              {/* <div className={styles.sectionReviewsContainer}>
            <div className={styles.sectionReview}>
              <h4>7.9/10</h4>
              <p>Cleanliness</p>
            </div>
            <div className={styles.sectionReview}>
              <h4>7.5/10</h4>
              <p>Staff & Service</p>
            </div>
            <div className={styles.sectionReview}>
              <h4>7.5/10</h4>
              <p>Amenities</p>
            </div>
            <div className={styles.sectionReview}>
              <h4>7.5/10</h4>
              <p>Property Conditions & Facilities</p>
            </div>
            <div className={styles.sectionReview}>
              <h4>4.3/10</h4>
              <p>Eco-friendliness</p>
            </div>
          </div> */}
            </div>
          </div>
          <div className={styles.userReviewsContainer}>
            <div className={styles.head}>
              <h2 style={{ fontWeight: 900 }}>
                See What Guests Loved the Most:
              </h2>
              <CustomButton fit>View All</CustomButton>
            </div>
            <div className={styles.userReviews}>
              <UserReviewCard key="1" />
              <UserReviewCard key="2" />
              <UserReviewCard key="3" />
              <UserReviewCard key="4" />
            </div>
            <div className={styles.reviewNav}>
              <div
                className={`${styles.arrowContainer} ${
                  currentUserReviewPage <= 1 ? styles.disabled : ""
                }`}
                onClick={prevReviewPage}
              >
                <BsArrowRight className={styles.arrow} />
              </div>
              <div className={styles.pages}>
                {[...Array(5)].map((_, i) => (
                  <p
                    key={i}
                    className={`${styles.page} ${
                      currentUserReviewPage === i + 1 ? styles.active : ""
                    }`}
                  >
                    {i + 1}
                  </p>
                ))}
              </div>
              <div
                className={`${styles.arrowContainer} ${
                  currentUserReviewPage >= 5 ? styles.disabled : ""
                }`}
                onClick={nextReviewPage}
              >
                <BsArrowRight className={styles.arrow} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Reviews;
