import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import styles from "./wishlist-card.module.scss";
import { IoClose } from "react-icons/io5";
import CustomButton from "#components/custom-button/custom-button";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import { fetchMultipleFacilities } from "#api/facilities.req";
import { calculateReviewMsg, totalReviews } from "#utils/calculate-review-msg";
import { RiStarFill } from "react-icons/ri";
import Stars from "#components/stars/stars";

function WishlistCard({ property, prices, updateWishlist }) {
  const servicesQuery = useQuery({
    queryKey: ["services"],
    enabled: !!property?.facilities,
    queryFn: async () => {
      const response = await fetchMultipleFacilities(property?.facilities);
      console.log({ response });
      return response?.data;
    },
  });
  const { isError, isLoading } = servicesQuery;
  const services = servicesQuery?.data?.facilities;

  return (
    <div className={styles.wishlistCard}>
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
          onClick={() => updateWishlist(property?._id)}
        >
          <IoClose className={styles.close} />
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.titleContainer}>
          <h3>{property?.propertyName}</h3>
          <p className={styles.location}>
            {property?.city}, {property?.country} -{" "}
            <span>
              location <HiOutlineLocationMarker />
            </span>
          </p>
        </div>
        <div className={styles.description}>
          <h4>Description</h4>
          <p>{property?.description}</p>
        </div>
        <div className={styles.feature}>
          <h3>{property?.roomType}</h3>
          <p>{property?.beds}</p>
        </div>
        <div className={styles.servicesContainer}>
          <h3>Services</h3>
          {/* <p>Lorem Ipsum is simply dummy text of the printing and</p> */}
          <div className={styles.services}>
            {services &&
              services
                // ?.filter((_, i) => i < 5)
                ?.map((service) => (
                  <img
                    key={service?._id}
                    src={
                      import.meta.env.VITE_SERVER_URL +
                      "/images/" +
                      service?.image
                    }
                    alt=""
                  />
                ))}
            {/* {services?.length > 5 && <p>more...</p>} */}
          </div>
        </div>
      </div>
      <div className={styles.priceNReviews}>
        <div className={styles.reviews}>
          <h4>{calculateReviewMsg(property?.averageRating)}</h4>
          <div className={styles.rating}>
            <p>{property?.averageRating}</p>
            <Stars
              ratings={property?.averageRating}
              color="#0868f8"
              size={20}
            />
            {/* <div className={styles.stars}>
              {Array(parseInt(property?.averageRating))
                .fill()
                .map((_, i) => (
                  <RiStarFill key={i} className={styles.star} />
                ))}
            </div> */}
          </div>
          <p>Reviews &#40;{totalReviews(property?.ratings)}&#41;</p>
        </div>
        <div className={styles.price}>
          <p>Per Night</p>
          <h3>
            ₹ {prices[0]} - {prices[prices.length - 1]}
          </h3>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <CustomButton customStyles={{ maxWidth: "250px" }}>
          Check Availabilities
        </CustomButton>
      </div>
    </div>
  );
}

export default WishlistCard;
