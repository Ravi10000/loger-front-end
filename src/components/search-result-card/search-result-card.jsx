import styles from "./search-result-card.module.scss";
import { useMemo, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Balancer } from "react-wrap-balancer";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiUser4Fill } from "react-icons/ri";
import CustomButton from "#components/custom-button/custom-button";
import { useNavigate, useSearchParams } from "react-router-dom";
import findUniqueObjects from "#utils/find-unique-objects";
import { IoIosMore } from "react-icons/io";
import { calculateReviewMsg, totalReviews } from "#utils/calculate-review-msg";
import Stars from "#components/stars/stars";
import { currencyFormator } from "#utils/currency-formator";
import { addToWishlist, removeFromWishlist } from "#api/wishlist.req";
import { useMutation } from "@tanstack/react-query";
import { useAuthWindow } from "#contexts/auth-window.context";
import { pushFlash } from "#redux/flash/flash.actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import ApartmentDescription from "#components/apartment-description";
import { encrypt } from "#utils/secure-url.utils";
import api from "#api/index";

ConnectedSearchResultCard.propTypes = {
  property: PropTypes.object,
  apartmentDetails: PropTypes.object,
  pkg: PropTypes.object,
  occupancy: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pushFlash: PropTypes.func,
  currentUser: PropTypes.object,
};

function ConnectedSearchResultCard({
  property,
  pkg,
  occupancy,
  pushFlash,
  currentUser,
}) {
  const [searchParams] = useSearchParams();
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const location = searchParams.get("location");
  const roomsCount = parseInt(searchParams.get("noOfRooms"));
  const adultsCount = parseInt(searchParams.get("noOfAdults"));

  const { openAuthWindow } = useAuthWindow();

  const isHotel = property?.propertyType === "hotel";
  const content = isHotel ? property?.hotel : property?.apartment;
  if (content?.aboutProperty) {
    if (content?.aboutProperty?.length > 150)
      content.aboutProperty = content?.aboutProperty?.substring(0, 150) + "...";
  } else if (content) {
    content.aboutProperty = `Lorem Ipsum is simply dummy text of the printing and
    typesetting industry. Lorem Ipsum has been the industry Read
    More...`;
  }

  const matchedApartmentPkg =
    property?.apartment?.prices?.find((pkg) => pkg?.occupancy == adultsCount) ??
    null;

  const propertyPrice = isHotel
    ? pkg?.price
    : matchedApartmentPkg?.discountedPrice ?? null;

  const [liked, setLiked] = useState(property?.isInWishlist);
  const navigate = useNavigate();

  const wishlistMutation = useMutation({
    mutationFn: async () => {
      let response = {};
      if (currentUser) {
        if (!liked) response = await addToWishlist(property._id);
        else response = await removeFromWishlist(property._id);
      } else openAuthWindow("signin");
      return response;
    },
    onSuccess: (response) => {
      if (response?.data?.status === "success") {
        pushFlash({
          type: "success",
          message: liked ? "removed from wishlist" : "added to wishlist",
        });
        setLiked((prevState) => !prevState);
      }
    },
  });

  const checkAvailability = useMutation({
    mutationFn: async () => {
      const res = await api.get(
        `/calendar/check-availability/${
          property._id
        }?checkIn=${checkIn}&checkOut=${checkOut}${
          pkg?.rooms?.length ? `&rooms=${JSON.stringify(pkg?.rooms)}` : ""
        }`
      );
      if (!res?.data?.isAvailable) {
        pushFlash({
          type: "warning",
          message: "Property is not available for selected dates",
        });
        return;
      }
      navigate(
        `/property/${
          property?._id
        }?checkIn=${checkIn}&checkOut=${checkOut}&location=${location}&noOfRooms=${roomsCount}&noOfAdults=${adultsCount}${
          pkg?.price ? `&pkg=${encrypt(pkg)}` : ""
        }`
      );
    },
    onError: (err) => {
      console.log({ err });
      pushFlash({
        type: "error",
        message: "something went wrong, please try again later",
      });
    },
  });

  const rooms = useMemo(() => {
    return pkg?.rooms ? findUniqueObjects(pkg?.rooms, "name") : null;
  }, [pkg?.rooms]);

  const mainPhoto =
    property?.photos?.find((photo) => photo?.isMain) ?? property?.photos?.[0];
  return (
    <div className={styles.searchResultCard}>
      {/* {isHotel ? (
        <span className={`${styles.propertyType} ${styles.hotel}`}>H</span>
      ) : (
        <span className={`${styles.propertyType} ${styles.apartment}`}>A</span>
      )} */}
      <div className={styles.imageContainer}>
        <img
          src={`${import.meta.env.VITE_SERVER_URL}/images/${
            mainPhoto?.photoUrl
          }`}
          alt="property"
        />
        <div
          className={styles.likeIconContainer}
          onClick={(e) => {
            e.stopPropagation();
            wishlistMutation.mutate();
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
          <h3 style={{ fontSize: "24px" }}>
            <Balancer>{property?.propertyName}</Balancer>
          </h3>
          <div className={styles.locationContainer}>
            <p>
              {property?.country}, {property?.city} - <span>location</span>
            </p>
            <HiOutlineLocationMarker className={styles.locationIcon} />
          </div>
          <div className={styles.description}>
            <h4 style={{ fontSize: "18px" }}>Description</h4>
            <p>{content?.aboutProperty}</p>
          </div>
          {isHotel && pkg ? (
            <div className={styles.rooms}>
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
          ) : (
            occupancy && (
              <div>
                <p>
                  Occupacy : {adultsCount}{" "}
                  {Array(Math.min(4, adultsCount))
                    .fill()
                    .map((_, i) => (
                      <RiUser4Fill key={i} />
                    ))}
                  {adultsCount > 4 && <span> + {adultsCount - 4}</span>}
                </p>
              </div>
            )
          )}
          <h4>{property?.roomType}</h4>
          <div className={styles.services}>
            <h4>Services</h4>
            <div className={styles.servicesGroup}>
              {property?.facilities?.map((facility, idx) => {
                if (idx > 3) return null;
                return (
                  <img
                    key={facility._id}
                    src={`${import.meta.env.VITE_SERVER_URL}/images/${
                      facility?.image
                    }`}
                  />
                );
              })}{" "}
              {property?.facilities?.length > 3 && (
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
            <h4>
              {property?.averageRating
                ? calculateReviewMsg(property?.averageRating)
                : "N/A"}
            </h4>
            <div className={styles.rating}>
              <p>{property?.averageRating}</p>
              <Stars
                ratings={property?.averageRating}
                color="#0868f8"
                size={20}
              />
            </div>
            <p>
              Reviews &#40;
              {property?.ratings && totalReviews(property?.ratings)}&#41;
            </p>
          </div>
          {propertyPrice && (
            <div className={styles.priceContainer}>
              <h4>Per Night</h4>
              <p className={styles.amount}>{currencyFormator(propertyPrice)}</p>
              <p>₹ 100 taxes and charges</p>
            </div>
          )}
          <div className={styles.btnContainer}>
            <CustomButton
              customStyles={!propertyPrice ? { opacity: ".5" } : {}}
              onClick={checkAvailability.mutate}
              isLoading={checkAvailability.status === "pending"}
            >
              {!propertyPrice ? "Unavailable" : "Check Availabilities"}
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});
const SearchResultsCard = connect(mapState, { pushFlash })(
  ConnectedSearchResultCard
);

export default SearchResultsCard;
