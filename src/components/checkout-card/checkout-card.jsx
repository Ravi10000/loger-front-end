import styles from "./checkout-card.module.scss";
import { HiOutlineChevronRight } from "react-icons/hi";

import { useState } from "react";
import { PiWarningCircle } from "react-icons/pi";
import { currencyFormator } from "#utils/currency-formator";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { extractPhotUrls, reorderPhotos } from "#utils/photos.util";
import { calculateAdditionalDiscount } from "#utils/calculate-additional-discount";

CheckoutCard.propTypes = {
  checkoutDetails: PropTypes.object,
  bookingDetails: PropTypes.object,
  property: PropTypes.object,
  pkgDetails: PropTypes.object,
  setCarouselImages: PropTypes.func,
  discounts: PropTypes.array,
};

function CheckoutCard({
  checkoutDetails,
  bookingDetails,
  property,
  pkgDetails,
  setCarouselImages,
  discounts,
}) {
  const roomDetails = [];
  const isHotel = property?.propertyType === "hotel";
  if (isHotel) {
    const rooms = Object.keys(pkgDetails?.rooms || {});
    rooms.forEach((room) => {
      roomDetails.push({
        roomName: room,
        count: pkgDetails?.rooms?.[room]?.count,
      });
    });
  }
  console.log({ rooms: pkgDetails.rooms });
  const photos = reorderPhotos(checkoutDetails?.photos);
  const photosUrls = extractPhotUrls(photos);

  const [currentImage, setCurrentImage] = useState(0);
  const nextImage = (e) => {
    e.stopPropagation();
    if (currentImage < photos?.length - 1) {
      setCurrentImage(currentImage + 1);
    } else {
      setCurrentImage(0);
    }
  };
  const prevImage = (e) => {
    e.stopPropagation();
    if (currentImage > 0) {
      setCurrentImage(currentImage - 1);
    } else {
      setCurrentImage(photos?.length - 1);
    }
  };
  const checkInDate = dayjs(bookingDetails?.checkInDate).format(
    "dddd, DD/MM/YYYY"
  );

  const daysToGo =
    dayjs(bookingDetails?.checkInDate).get("date") - dayjs().get("date");
  const tripLength = dayjs(bookingDetails?.checkOutDate).diff(
    bookingDetails?.checkInDate,
    "day"
  );

  return (
    <div className={styles.checkoutCard}>
      <div
        className={styles.imageCarousel}
        onClick={() => setCarouselImages(photosUrls)}
      >
        <p className={styles.label}>Popular Among Rooms</p>
        <img
          src={
            import.meta.env.VITE_SERVER_URL +
            "/images/" +
            photos?.[currentImage]?.photoUrl
          }
          alt="room"
        />
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
          <h4>{property?.propertyName}</h4>
          <p>{checkoutDetails?.rating}</p>
        </div>
        <div className={styles.features}>
          {property?.apartment?.apartmentSize && (
            <div className={styles.feature}>
              <img src="/images/room-icons/size.svg" alt="size" />
              <p>
                {checkoutDetails?.roomSize ||
                  property?.apartment?.apartmentSize}
              </p>
            </div>
          )}
          {/* <div className={styles.feature}>
            <img src="/images/highlight-icons/bed.svg" alt="beds" />
            <p>
              {checkoutDetails?.singleBedCount} Single Bed
              {checkoutDetails?.singleBedCount > 1 ? "s" : ""},
              {checkoutDetails?.doubleBedCount
                ? `${checkoutDetails?.doubleBedCount} Double Bed${
                    checkoutDetails?.doubleBedCount > 1 ? "s" : ""
                  }`
                : ""}
            </p>
          </div> */}
          <div className={styles.feature}>
            <img src="/images/room-icons/users.svg" alt="users" />
            <p>Capacity - {checkoutDetails?.capacity}</p>
          </div>
          <div className={styles.feature}>
            <img src="/images/highlight-icons/parking.svg" alt="parking" />
            <p>
              {property?.parkingAvailable
                ? "Parking Available"
                : "Parking Not Available"}
            </p>
          </div>
          <div className={styles.feature}>
            <img src="/images/room-icons/meal.svg" alt="meal" />
            <p>{property?.breakfastIncluded ? "Included" : "Not Included"}</p>
          </div>
        </div>
        <div className={styles.topBorder}></div>
        <h3>Your Booking Details</h3>
        <div className={`${styles.bookingDetails}`}>
          <div className={styles.info}>
            <p>Check In</p>
            <h3>{checkInDate}</h3>
            <p>
              Time - {property?.checkInStartTime} - {property?.checkInEndTime}
            </p>
            <div className={styles.iconInfo}>
              <PiWarningCircle className={styles.icon} />
              <p>
                {daysToGo > 0
                  ? `Just ${daysToGo} Days To Go!`
                  : "Check In Today"}
              </p>
            </div>
          </div>
          <div className={styles.info}>
            <p>Check Out</p>
            <h3>
              {dayjs(bookingDetails?.checkOutDate).format("dddd, DD/MM/YYYY")}
            </h3>
            <p>
              Time - {property?.checkOutStartTime} - {property?.checkOutEndTime}
            </p>
            <h3>Total Length of Stay:</h3>
            <p>
              {tripLength} Night{!!(tripLength > 1) && "s"}
            </p>
          </div>
        </div>
        {isHotel && (
          <>
            <div className={styles.bookingDetails}>
              <h3>You Selected</h3>
            </div>
            {roomDetails?.map?.((room) => {
              if (!room.count) return null;
              return (
                <p key={room.roomName}>
                  {room.count} {room.roomName} Room{!!(room.count > 1) && "s"}
                </p>
              );
            })}
          </>
        )}
        <div className={styles.topBorder}></div>
        <h3>Your Price Summary</h3>
        <div className={styles.bookingDetails}>
          <div className={styles.breakdown}>
            {discounts?.map?.((discount) => (
              <p key={discount.label}>
                {discount.label}{" "}
                {discount?.discount ? (
                  <span
                    style={{
                      background: "var(--main-brand-color)",
                      color: "#fff",
                      padding: "2px 10px",
                      borderRadius: "10px",
                      fontSize: "12px",
                      marginLeft: "5px",
                    }}
                  >
                    {discount?.discount}%
                  </span>
                ) : null}
              </p>
            ))}
          </div>
          <div className={styles.breakdown + " " + styles.prices}>
            {discounts?.map?.((discount, idx) => (
              <p key={discount?.label}>
                {idx > 0 ? "- " : ""}
                {currencyFormator(
                  idx > 0
                    ? discounts[idx - 1].amount - discount.amount
                    : discount.amount
                )}
              </p>
            ))}
          </div>
        </div>
        <div className={styles.topBorder}></div>
        <div className={styles.bookingDetails}>
          <p className={styles.coloredBold}>Total</p>
          <p className={styles.coloredBold}>
            {currencyFormator(discounts?.[discounts.length - 1]?.amount)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CheckoutCard;
