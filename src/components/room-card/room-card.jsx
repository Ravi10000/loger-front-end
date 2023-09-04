import styles from "./room-card.module.scss";
import CustomButton from "#components/custom-button/custom-button";
import { HiOutlineChevronRight } from "react-icons/hi";

import { useState } from "react";

function RoomCard({ room }) {
  const [currentImage, setCurrentImage] = useState(0);
  const nextImage = () => {
    if (currentImage < room?.images?.length - 1) {
      setCurrentImage(currentImage + 1);
    } else {
      setCurrentImage(0);
    }
  };
  const prevImage = () => {
    if (currentImage > 0) {
      setCurrentImage(currentImage - 1);
    } else {
      setCurrentImage(room?.images?.length - 1);
    }
  };
  return (
    <div className={styles.roomCard}>
      <div className={styles.imageCarousel}>
        <p className={styles.label}>Popular Among Rooms</p>
        <img src={room?.images?.[currentImage]} alt="room" />
        <div className={styles.backdrop}>
          <div className={styles.carouselNavigator}>
            <HiOutlineChevronRight
              className={styles.arrow}
              onClick={prevImage}
            />
            <p>
              {currentImage + 1} / {room?.images?.length}
            </p>
            <HiOutlineChevronRight
              className={styles.arrow}
              onClick={nextImage}
            />
          </div>
        </div>
      </div>
      <div className={styles.roomInfo}>
        <div className={styles.head}>
          <h4>{room?.title}</h4>
          <p>{room?.rating}</p>
        </div>
        <div className={styles.features}>
          <div className={styles.feature}>
            <img src="/images/room-icons/size.svg" alt="size" />
            <p>{room?.size}</p>
          </div>
          <div className={styles.feature}>
            <img src="/images/highlight-icons/bed.svg" alt="beds" />
            <p>{room?.beds}</p>
          </div>
          <div className={styles.feature}>
            <img src="/images/room-icons/view.svg" alt="view" />
            <p>{room?.view}</p>
          </div>
          <div className={styles.feature}>
            <img src="/images/room-icons/users.svg" alt="users" />
            <p>{room?.capacity}</p>
          </div>
          <div className={styles.feature}>
            <img src="/images/highlight-icons/parking.svg" alt="parking" />
            <p>{room?.parking}</p>
          </div>
          <div className={styles.feature}>
            <img src="/images/room-icons/meal.svg" alt="meal" />
            <p>{room?.meal}</p>
          </div>
          <div className={`${styles.feature} ${styles.colored}`}>
            <img src="/images/room-icons/refund.svg" alt="refund" />
            <p>{room?.refundable}</p>
          </div>
          <div className={`${styles.feature} ${styles.colored} ${styles.lg}`}>
            <img src="/images/room-icons/plus.svg" alt="cancellation" />
            <p>{room?.cancellation}</p>
          </div>
        </div>
        <div className={styles.viewMore}>
          <p>View Details</p>
          <HiOutlineChevronRight className={styles.icon} />
        </div>
        <p className={styles.discount}>{room?.discount}</p>
        <div className={styles.price}>
          <p className={styles.priceText}>&nbsp;₹ {room?.price} &nbsp;</p>
          <p className={styles.discountedPrice}>₹ {room?.discountedPrice}</p>
        </div>
        <div className={styles.bottomMsg}>
          <p>Includes Taxes & Fees</p>
          <p>{room?.daysLeft}</p>
        </div>
        <CustomButton>Reserve a Room</CustomButton>
      </div>
    </div>
  );
}

export default RoomCard;
