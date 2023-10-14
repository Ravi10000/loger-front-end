import styles from "./reviews.module.scss";

import RatingBar from "#components/review-bar/rating-bar";
import UserReviewCard from "#components/user-review-card/user-review-card";
import { RiStarFill } from "react-icons/ri";
import Balancer from "react-wrap-balancer";
import CustomButton from "#components/custom-button/custom-button";
import { BsArrowRight } from "react-icons/bs";
import { useState } from "react";

function Reviews() {
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
  return (
    <div className={styles.container}>
      <div className={styles.reviewContainer}>
        <div className={styles.left}>
          <div className={styles.ratingsContainer}>
            <h3>Reviews</h3>
            <div className={styles.rating}>
              <h2>4.0</h2>
              <div className={styles.ratingInfo}>
                <p>
                  Out of <br />5 Star
                </p>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <RiStarFill key={i} className={styles.star} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.ratingGraph}>
            <RatingBar
              key="5-stars"
              ratingDetails={{
                count: 45,
                totalCount: 100,
                name: "5 Stars",
                filledColor: "#00C964",
                emptyColor: "#E6FAF0",
              }}
            />
            <RatingBar
              key="4-stars"
              ratingDetails={{
                count: 25,
                totalCount: 100,
                name: "4 Stars",
                filledColor: "#0868F8",
                emptyColor: "#E7F0FF",
              }}
            />
            <RatingBar
              key="3-stars"
              ratingDetails={{
                count: 15,
                totalCount: 100,
                name: "3 Stars",
                filledColor: "#FCBB06",
                emptyColor: "#FFF9E7",
              }}
            />
            <RatingBar
              key="2-stars"
              ratingDetails={{
                count: 10,
                totalCount: 100,
                name: "2 Stars",
                filledColor: "#F87B08",
                emptyColor: "#FFF2E7",
              }}
            />
            <RatingBar
              key="1-stars"
              ratingDetails={{
                count: "05",
                totalCount: 100,
                name: "1 Stars",
              }}
            />
          </div>
        </div>
        <div className={styles.right}>
          <h3>For Our Reviews</h3>
          <p>
            <Balancer>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Balancer>
          </p>
          <div className={styles.sectionReviewsContainer}>
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
          </div>
        </div>
      </div>
      <div className={styles.userReviewsContainer}>
        <div className={styles.head}>
          <h2>See What Guests Loved the Most:</h2>
          <CustomButton fit>View All</CustomButton>
        </div>
        <div className={styles.userReviews}>
          <UserReviewCard key="1"/>
          <UserReviewCard key="2"/>
          <UserReviewCard key="3"/>
          <UserReviewCard key="4"/>
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
    </div>
  );
}

export default Reviews;
