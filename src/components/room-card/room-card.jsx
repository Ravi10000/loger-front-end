import styles from "./room-card.module.scss";
import CustomButton from "#components/custom-button/custom-button";
import { HiOutlineChevronRight } from "react-icons/hi";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiWarningCircle } from "react-icons/pi";

// const photos = [
//   "/images/property/one.png",
//   "/images/property/seven.png",
//   "/images/property/three.png",
//   "/images/property/four.png",
//   "/images/property/five.png",
// ];

function RoomCard({ room, booking }) {
  const navigate = useNavigate();
  const photos = room.photos;
  const [currentImage, setCurrentImage] = useState(0);
  const nextImage = () => {
    if (currentImage < photos?.length - 1) {
      setCurrentImage(currentImage + 1);
    } else {
      setCurrentImage(0);
    }
  };
  const prevImage = () => {
    if (currentImage > 0) {
      setCurrentImage(currentImage - 1);
    } else {
      setCurrentImage(photos?.length - 1);
    }
  };
  return (
    <div className={styles.roomCard}>
      <div className={styles.imageCarousel}>
        <p className={styles.label}>Popular Among Rooms</p>
        <img src={import.meta.env.VITE_SERVER_URL + "/images/" + photos?.[currentImage]?.photoUrl} alt="room" />
        <div className={styles.backdrop}>
          <div className={styles.carouselNavigator}>
            <HiOutlineChevronRight
              className={styles.arrow}
              onClick={prevImage}
            />
            <p>
              {currentImage + 1} / {photos?.length}
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
            <p>{room?.roomSize}</p>
          </div>
          <div className={styles.feature}>
            <img src="/images/highlight-icons/bed.svg" alt="beds" />
            <p>
              {room?.singleBedCount} Single Bed
              {room?.singleBedCount > 1 ? "s" : ""},
              {room?.doubleBedCount
                ? `${room?.doubleBedCount} Double Bed${
                    room?.doubleBedCount > 1 ? "s" : ""
                  }`
                : ""}
            </p>
          </div>
          <div className={styles.feature}>
            <img src="/images/room-icons/view.svg" alt="view" />
            <p>{room?.view}</p>
          </div>
          <div className={styles.feature}>
            <img src="/images/room-icons/users.svg" alt="users" />
            <p>Capacity - {room?.capacity}</p>
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

        {!booking ? (
          <>
            <p className={styles.discount}>{room?.discount}</p>
            <div className={styles.price}>
              <p className={styles.priceText}>&nbsp;₹ {room?.price} &nbsp;</p>
              <p className={styles.discountedPrice}>
                ₹ {room?.discountedPrice}
              </p>
            </div>
            <div className={styles.bottomMsg}>
              <p>Includes Taxes & Fees</p>
              <p>{room?.daysLeft}</p>
            </div>
            <CustomButton onClick={() => navigate("/checkout")}>
              Reserve a Room
            </CustomButton>
          </>
        ) : (
          <>
            <div className={styles.topBorder}></div>
            <h3>Your Booking Details</h3>
            <div className={`${styles.bookingDetails}`}>
              <div className={styles.info}>
                <p>check in</p>
                <h3>Friday, 29/06/2023</h3>
                <p>Time - 12:00 - 00:00</p>
                <div className={styles.iconInfo}>
                  <PiWarningCircle className={styles.icon} />
                  <p>Just 3 Days To Go!</p>
                </div>
              </div>
              <div className={styles.info}>
                <p>check out</p>
                <h3>Thursday, 04/07/2023</h3>
                <p>Time - 00:00 - 11:00</p>
                <h3>Total Length of Stay:</h3>
                <p>2 Night & 3 Days</p>
              </div>
            </div>
            <div className={styles.bookingDetails}>
              <h3>You Selected</h3>
              <p className={styles.link}>Change Your Selection</p>
            </div>
            <p>Superior King Room</p>
            <div className={styles.topBorder}></div>
            <h3>Your Price Summary</h3>
            <div className={styles.bookingDetails}>
              <div className={styles.breakdown}>
                <p>Original Price</p>
                <p>Getaway Deal</p>
                <p>Genius Discount</p>
              </div>
              <div className={styles.breakdown + " " + styles.prices}>
                <p>₹ 5,388</p>
                <p>- ₹ 768.60</p>
                <p>- ₹ 1,120</p>
              </div>
            </div>
            <div className={styles.topBorder}></div>
            <div className={styles.bookingDetails}>
              <p className={styles.coloredBold}>Total</p>
              <p className={styles.coloredBold}>₹ 3,500</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default RoomCard;
