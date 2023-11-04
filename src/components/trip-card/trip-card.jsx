import styles from "./trip-card.module.scss";

import { useReviewWindow } from "#contexts/review-window.context";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";
import Balancer from "react-wrap-balancer";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiStarFill } from "react-icons/ri";
import { currencyFormator } from "#utils/currency-formator";
import { totalReviews } from "#utils/calculate-review-msg";
import Stars from "#components/stars/stars";
import { useMutation } from "@tanstack/react-query";
import { pushFlash } from "#redux/flash/flash.actions";
import { connect } from "react-redux";
import dayjs from "dayjs";

function TripCard({ booking, setBookingToCancel }) {
  const property = booking?.property;
  const [isSaved, setIsSaved] = useState(false);
  const { setPropertyReviewing } = useReviewWindow();
  function handleTripAction() {
    if (booking?.status === "upcomming") {
      setBookingToCancel(booking?._id);
    }
  }
  return (
    <div className={styles.tripCardContainer}>
      <div className={styles.tripCard}>
        <div
          className={styles.image}
          style={{
            backgroundImage: `url("${import.meta.env.VITE_SERVER_URL}/images/${
              property?.photos?.[0]?.photoUrl
            }")`,
          }}
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
            <Balancer>{property?.propertyName}</Balancer>
          </h3>
          <div className={styles.location}>
            <p>
              {property?.city}, {property?.country} - <span>location</span>
            </p>
            <HiOutlineLocationMarker className={styles.icon} />
          </div>
          <div className={styles.description}>
            <h4>Details</h4>
            <div className={styles.datesContainer}>
              <div className={styles.date}>
                <h5>Check In Date</h5>{" "}
                <p>{dayjs(booking.checkInDate).format("DD/MM/YYYY")}</p>
              </div>
              <div className={styles.date}>
                <h5>Check Out Date</h5>{" "}
                <p>{dayjs(booking.checkOutDate).format("DD/MM/YYYY")}</p>
              </div>
            </div>
            {/* <p>
              <Balancer>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry Read More...
              </Balancer>
            </p> */}
          </div>
        </div>
        <div className={styles.bottomSection}>
          <div className={styles.priceContainer}>
            {/* <p>Per Night</p> */}
            <p className={styles.priceText}>
              {currencyFormator(booking?.bookingAmount)}
            </p>
            <p>₹ 100 taxes and charges</p>
          </div>
          <button
            className={`${styles.button} ${styles?.[booking?.status]}`}
            onClick={handleTripAction}
          >
            {booking?.status === "upcomming"
              ? "Cancel Your Trip"
              : booking?.status === "cancelled"
              ? "Cancelled"
              : "Reserve Again"}
          </button>
        </div>
      </div>
      {booking?.status === "active" && (
        <div className={`${styles.extraInfo} ${styles.active}`}>
          <h4>
            <Balancer>Your Journey Will Start On</Balancer>
          </h4>
          <div className={styles.dateNTime}>
            <div className={styles.date}>
              <img src="/images/icons/calendar.svg" alt="calender" />
              <p>{booking?.startDate}</p>
            </div>
            <div className={styles.date}>
              <img src="/images/icons/clock.svg" alt="calender" />
              <p>{booking?.startTime}</p>
            </div>
          </div>
          <p className={styles.link}>Privacy Policy</p>
        </div>
      )}
      {booking?.status === "cancelled" &&
      booking?.refundStatus === "success" ? (
        <div className={styles.extraInfo}>
          <h3>Refund</h3>
          <p className={styles.successText}>Successfull</p>
          <p className={styles.link}>Privacy Policy</p>
        </div>
      ) : (
        booking?.status === "cancelled" && (
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
      {booking?.status === "completed" && (
        <div className={styles.extraInfo}>
          <div className={styles.rating}>
            <p>{property?.averageRating}</p>
            <Stars
              ratings={property?.averageRating}
              color="var(--main-brand-color)"
              size={20}
            />
          </div>

          <p>Reviews({totalReviews(property?.ratings)})</p>
          <button
            className={styles.reviewBtn}
            onClick={() => setPropertyReviewing(property?._id)}
          >
            Write Your Review
          </button>
        </div>
      )}
    </div>
  );
}

export default connect(null, { pushFlash })(TripCard);
