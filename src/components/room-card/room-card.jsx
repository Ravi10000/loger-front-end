import styles from "./room-card.module.scss";
import CustomButton from "#components/custom-button/custom-button";
import { HiOutlineChevronRight } from "react-icons/hi";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiWarningCircle } from "react-icons/pi";
import CustomSelect from "#components/custom-select/custom-select";
import { currencyFormator } from "#utils/currency-formator";
import dayjs from "dayjs";
import Counter from "#components/counter/counter";

// const photos = [
//   "/images/property/one.png",
//   "/images/property/seven.png",
//   "/images/property/three.png",
//   "/images/property/four.png",
//   "/images/property/five.png",
// ];

function RoomCard({
  room,
  bookingDetails,
  property,
  count,
  totalCount,
  pkgDetails,
  setPkgDetails,
}) {
  // let roomCount = pkgDetails?.[room.roomName]?.count || 0;
  const [roomCount, setRoomCount] = useState(
    parseInt(pkgDetails?.[room.roomName]?.count || 0)
  );

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
  useEffect(() => {
    if (setPkgDetails)
      setPkgDetails((prevState) => ({
        ...prevState,
        [room.roomName]: {
          ...prevState[room.roomName],
          discountedPrice: room.discountedPrice,
          price: room.price,
          count: roomCount,
        },
      }));
  }, [roomCount]);

  return (
    <div className={styles.roomCard}>
      <div className={styles.imageCarousel}>
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
          <h4>{room?.roomName}</h4>
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
          {/* <div className={styles.feature}>
            <img src="/images/room-icons/view.svg" alt="view" />
            <p>{room?.view}</p>
          </div> */}
          <div className={styles.feature}>
            <img src="/images/room-icons/users.svg" alt="users" />
            <p>Capacity - {room?.capacity}</p>
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
            <p>{room?.breakfastIncluded ? "Included" : "Not Included"}</p>
          </div>
          <div className={`${styles.feature} ${styles.colored}`}>
            <img src="/images/room-icons/refund.svg" alt="refund" />
            <p>{room?.refundable}</p>
          </div>
          <div className={`${styles.feature} ${styles.colored} ${styles.lg}`}>
            <img src="/images/room-icons/plus.svg" alt="cancellation" />
            <p>Free Cancellation before {room?.freeCancellationBefore} Days</p>
          </div>
        </div>
        <div className={styles.viewMore}>
          <p>View Details</p>
          <HiOutlineChevronRight className={styles.icon} />
        </div>

        {!bookingDetails ? (
          <>
            <p className={styles.discount}>
              {parseInt(
                ((room?.price - room?.discountedPrice) / room?.price) * 100
              ).toFixed(2)}
              %
            </p>
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
            <div className={styles.roomCount}>
              {/* <p>Rooms Selected:</p> */}
              {/* <CustomSelect
                selected={roomCount}
                onCountChange={(count) => {
                  setPkgDetails((prevState) => {
                    console.log("changeTo: ", {
                      ...prevState,
                      [room.roomName]: {
                        price: room.price,
                        count,
                      },
                    });
                    return {
                      ...prevState,
                      [room.roomName]: {
                        discountedPrice: room.discountedPrice,
                        price: room.price,
                        count,
                      },
                    };
                  });
                }}
                // setPkgDetails={setPkgDetails}
                list={Array(totalCount)
                  .fill()
                  .map((_, i) => i + 1)}
              /> */}
              <Counter
                value={roomCount}
                title="No Of Rooms"
                setValue={setRoomCount}
              />
            </div>
            {/* <CustomButton onClick={() => navigate("/checkout")}>
              Reserve a Room
            </CustomButton> */}
          </>
        ) : (
          <>
            <div className={styles.topBorder}></div>
            <h3>Your Booking Details</h3>
            <div className={`${styles.bookingDetails}`}>
              <div className={styles.info}>
                <p>check in</p>
                <h3>
                  {dayjs(bookingDetails?.checkInDate).format(
                    "dddd, DD/MM/YYYY"
                  )}
                </h3>
                <p>Time - 12:00 - 00:00</p>
                <div className={styles.iconInfo}>
                  <PiWarningCircle className={styles.icon} />
                  <p>
                    Just{" "}
                    {dayjs(bookingDetails?.checkInDate).diff(
                      dayjs(new Date()),
                      "day"
                    ) + 1}{" "}
                    Days To Go!
                  </p>
                </div>
              </div>
              <div className={styles.info}>
                <p>check out</p>
                <h3>
                  {dayjs(bookingDetails?.checkOutDate).format(
                    "dddd, DD/MM/YYYY"
                  )}
                </h3>
                <p>Time - 00:00 - 11:00</p>
                <h3>Total Length of Stay:</h3>
                <p>
                  {dayjs(bookingDetails?.checkOutDate).diff(
                    bookingDetails?.checkInDate,
                    "day"
                  ) + 1}{" "}
                  Days
                </p>
              </div>
            </div>
            <div className={styles.bookingDetails}>
              <h3>You Selected</h3>
              {/* <p className={styles.link}>Change Your Selection</p> */}
              {() => {
                // const roomNames = Object.keys(pkgDetails.rooms);
                return <></>;
              }}
            </div>
            <p>Superior King Room</p>
            <div className={styles.topBorder}></div>
            <h3>Your Price Summary</h3>
            <div className={styles.bookingDetails}>
              <div className={styles.breakdown}>
                <p>Original Price</p>
                {/* <p>Getaway Deal</p> */}
                <p>Genius Discount</p>
              </div>
              <div className={styles.breakdown + " " + styles.prices}>
                <p>{currencyFormator(pkgDetails?.amount)}</p>
                {/* <p>- ₹ 768.60</p> */}
                <p>
                  -{" "}
                  {currencyFormator(
                    pkgDetails?.amount - pkgDetails?.discountedAmount
                  )}
                </p>
              </div>
            </div>
            <div className={styles.topBorder}></div>
            <div className={styles.bookingDetails}>
              <p className={styles.coloredBold}>Total</p>
              <p className={styles.coloredBold}>
                {currencyFormator(pkgDetails?.discountedAmount)}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default RoomCard;
