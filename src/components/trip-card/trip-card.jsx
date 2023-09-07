import styles from "./trip-card.module.scss";

import { useReviewWindow } from "#contexts/review-window.context";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";
import Balancer from "react-wrap-balancer";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiStarFill } from "react-icons/ri";

function TripCard({ trip }) {
  const [isSaved, setIsSaved] = useState(false);
  const { openReviewWindow } = useReviewWindow();
  return (
    <div className={styles.tripCardContainer}>
      <div className={styles.tripCard}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url("${trip?.image}")` }}
        >
          <div
            className={styles.iconContainer}
            onClick={() => setIsSaved((prevState) => !prevState)}
          >
            {isSaved ? (
              <AiFillHeart className={`${styles.icon} ${styles.liked}`} />
            ) : (
              <AiOutlineHeart className={`${styles.icon}`} />
            )}
          </div>
        </div>
        <div className={styles.tripInfo}>
          <h3>
            <Balancer>{trip?.name}</Balancer>
          </h3>
          <div className={styles.location}>
            <p>
              {trip?.location} - <span>location</span>
            </p>
            <HiOutlineLocationMarker className={styles.icon} />
          </div>
          <div className={styles.description}>
            <h4>Description</h4>
            <p>
              <Balancer>{trip?.description}</Balancer>
            </p>
          </div>
        </div>
        <div className={styles.bottomSection}>
          <div className={styles.priceContainer}>
            <p>Per Night</p>
            <p className={styles.priceText}>₹ {trip?.price}</p>
            <p>₹ 100 taxes and charges</p>
          </div>
          <button className={`${styles.button} ${styles?.[trip?.status]}`}>
            {trip?.status === "active"
              ? "Cancel Your Trip"
              : trip?.status === "cancelled"
              ? "Cancelled"
              : "Reserve Again"}
          </button>
        </div>
      </div>
      {trip?.status === "active" && (
        <div className={`${styles.extraInfo} ${styles.active}`}>
          <h4>
            <Balancer>Your Journey Will Start On</Balancer>
          </h4>
          <div className={styles.dateNTime}>
            <div className={styles.date}>
              <img src="/images/icons/calendar.svg" alt="calender" />
              <p>{trip?.startDate}</p>
            </div>
            <div className={styles.date}>
              <img src="/images/icons/clock.svg" alt="calender" />
              <p>{trip?.startTime}</p>
            </div>
          </div>
          <p className={styles.link}>Privacy Policy</p>
        </div>
      )}
      {trip?.status === "cancelled" && trip?.refundStatus === "success" ? (
        <div className={styles.extraInfo}>
          <h3>Refund</h3>
          <p className={styles.successText}>Successfull</p>
          <p className={styles.link}>Privacy Policy</p>
        </div>
      ) : (
        trip?.status === "cancelled" && (
          <div className={styles.extraInfo}>
            <h4>
              <Balancer>
                Refund initiated, will be creadited under 24hr
              </Balancer>
            </h4>
            <div className={styles.date}>
              <img src="/images/icons/clock.svg" alt="calender" />
              <p>10h 58m 15s</p>
            </div>
            <p className={styles.link}>Privacy Policy</p>
          </div>
        )
      )}
      {trip?.status === "completed" && (
        <div className={styles.extraInfo}>
          <div className={styles.rating}>
            <div className={styles.stars}>
              {Array(4)
                .fill()
                .map((_, i) => (
                  <RiStarFill key={i} className={styles.star} />
                ))}
            </div>
            <p>4.0</p>
          </div>

          <p>Reviews(150)</p>
          <button className={styles.reviewBtn} onClick={openReviewWindow}>
            Write Your Review
          </button>
        </div>
      )}
    </div>
  );
}

export default TripCard;
