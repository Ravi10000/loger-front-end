import styles from "./search-result-card.module.scss";
import { useMemo, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Balancer } from "react-wrap-balancer";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiStarFill, RiUser4Fill } from "react-icons/ri";
import CustomButton from "#components/custom-button/custom-button";
import { useNavigate, useSearchParams } from "react-router-dom";
import findUniqueObjects from "#utils/find-unique-objects";
import { IoIosMore } from "react-icons/io";

function SearchResultCard({ property, pkg }) {
  console.log({ property });
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const location = searchParams.get("location");
  const roomsCount = parseInt(searchParams.get("noOfRooms"));
  const adultsCount = parseInt(searchParams.get("noOfAdults"));
  // const noOfChildren = parseInt(searchParams.get("noOfChildren"));

  const rooms = useMemo(
    () => findUniqueObjects(pkg?.rooms, "name"),
    [pkg?.rooms]
  );
  // const roomsCount = useMemo(
  //   () => rooms?.reduce((acc, room) => acc + room.roomCount, 0),
  //   [rooms]
  // );
  return (
    <div className={styles.searchResultCard}>
      <div className={styles.imageContainer}>
        {/* <img src="/images/property (2).png" alt="property" /> */}
        <img
          src={`${import.meta.env.VITE_SERVER_URL}/images/${
            property?.photos?.[0]?.photoUrl // TODO: change this to show main photo
          }`}
          alt="property"
        />
        <div
          className={styles.likeIconContainer}
          onClick={(e) => {
            e.stopPropagation();
            setLiked((prevState) => !prevState);
          }}
        >
          {liked ? (
            <AiFillHeart className={`${styles.likeIcon} ${styles.liked}`} />
          ) : (
            <AiOutlineHeart className={`${styles.likeIcon}`} />
          )}
        </div>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.propertyInfo}>
          <h3>
            <Balancer>{property?.propertyName}</Balancer>
          </h3>
          <div className={styles.locationContainer}>
            <p>
              {property?.country}, {property?.city} - <span>location</span>
            </p>
            <HiOutlineLocationMarker className={styles.locationIcon} />
          </div>
          <div className={styles.description}>
            <h4>Description</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry Read More...
            </p>
          </div>
          <div className={styles.rooms}>
            {/* <h4>
              <span>
                <span>
                  <RiUser4Fill /> Capacity :
                </span>
                {adultsCount}
              </span>
            </h4> */}
            <h4>
              {roomsCount > 1 ? `${roomsCount} Rooms` : `${roomsCount} Room`}
            </h4>
            <ul>
              {rooms?.map((room) => (
                <li key={room.name} className={styles.room}>
                  {room.roomCount} &times; {room.name} &nbsp;
                  {Array(room.capacity)
                    .fill()
                    .map((_, i) => (
                      <RiUser4Fill key={i} />
                    ))}
                </li>
              ))}
            </ul>
          </div>
          <h4>{property?.roomType}</h4>
          <div className={styles.services}>
            <h4>Services</h4>
            <div className={styles.servicesGroup}>
              {property?.facilities?.map((facility, idx) => {
                if (idx > 5) return null;
                return (
                  <img
                    key={facility._id}
                    src={`${import.meta.env.VITE_SERVER_URL}/images/${
                      facility?.image
                    }`}
                  />
                );
              })}{" "}
              {property?.facilities?.length > 5 && (
                <IoIosMore
                  style={{
                    fontSize: "2rem",
                    marginLeft: "-20px",
                    color: "gray",
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div className={styles.reviewNbooking}>
          <div className={styles.reviews}>
            <h4>Good Reviews</h4>
            <div className={styles.rating}>
              <div className={styles.stars}>
                {Array(property?.rating)
                  .fill()
                  .map((_, i) => (
                    <RiStarFill key={i} className={styles.star} />
                  ))}
              </div>
              <p>{property?.rating}.0</p>
            </div>
            <p>Reviews{`(${property?.reviews})`}</p>
          </div>
          <div className={styles.priceContainer}>
            <h4>Per Night</h4>
            <p className={styles.amount}>₹ {pkg?.price}</p>
            <p>₹ 100 taxes and charges</p>
          </div>
          <div className={styles.btnContainer}>
            <CustomButton
              onClick={() =>
                navigate(
                  `/property/${property?._id}?checkIn=${checkIn}&checkOut=${checkOut}&location=${location}&noOfRooms=${roomsCount}&noOfAdults=${adultsCount}`
                )
              }
            >
              Check Availabilities
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResultCard;
