import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import styles from "./wishlist-card.module.scss";
import { IoClose } from "react-icons/io5";
import CustomButton from "#components/custom-button/custom-button";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import { fetchMultipleFacilities } from "#api/facilities.req";

function WishlistCard({ property, updateWishlist }) {
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
          <p>Lorem Ipsum is simply dummy text of the printing and</p>
          <div className={styles.services}>
            {services &&
              services
                ?.filter((_, i) => i < 5)
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
            {services?.length > 5 && <p>more...</p>}
          </div>
        </div>
      </div>
      <div className={styles.priceNReviews}>
        <div className={styles.review}>
          <div className={styles.rating}>
            {Array.from({ length: property?.rating }, (_, i) => (
              <AiFillStar className={styles.star} key={i} />
            ))}
            {Array.from({ length: 5 - property?.rating }, (_, i) => (
              <AiOutlineStar
                className={styles.star}
                key={property?.rating + i}
              />
            ))}
            <p>{property?.rating}.0</p>
          </div>
          <p>Reviews ({property?.reviews})</p>
        </div>
        <div className={styles.price}>
          <p>Per Night</p>
          <h3>₹ {property?.price}</h3>
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
