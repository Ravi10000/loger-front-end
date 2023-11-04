import styles from "./property-card.module.scss";
import CustomButton from "#components/custom-button/custom-button";
import { RiStarFill } from "react-icons/ri";
import Balancer from "react-wrap-balancer";
import { useNavigate } from "react-router-dom";
import Stars from "#components/stars/stars";
import { currencyFormator } from "#utils/currency-formator";
function PropertyCard({ property }) {
  const navigate = useNavigate();
  return (
    <div className={styles.propertyCard}>
      {/* <img
        className={styles.propertyImage}
        src={
          item?.photos?.[0]?.photoUrl
            ? import.meta.env.VITE_SERVER_URL +
              "/images/" +
              item?.photos?.[0]?.photoUrl
            : "/images/property (1).png"
        }
        alt="property"
      /> */}
      <div
        className={styles.propertyImage}
        style={{
          backgroundImage: `url("${
            property?.photos?.[0]?.photoUrl
              ? import.meta.env.VITE_SERVER_URL +
                "/images/" +
                property?.photos?.[0]?.photoUrl
              : "/images/property (1).png"
          }")`,
        }}
      ></div>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <h3>
            <Balancer>{property?.propertyName || "no name"}</Balancer>
          </h3>
          <div className={styles.rating}>
            <Stars
              ratings={property?.averageRating}
              color="var(--main-brand-color)"
              size={20}
            />
            {/* <div className={styles.stars}>
              {Array(property?.rating || 1)
                .fill()
                .map((_, i) => (
                  <RiStarFill key={i} className={styles.star} />
                ))}
            </div> */}
            <p>{property?.averageRating || 1}</p>
          </div>
        </div>
        <div className={styles.location}>
          <img src="/images/icons/location.svg" alt="location" />
          <p>
            {property?.country}, {property?.city}
          </p>
        </div>
        <p className={styles.description}>
          <Balancer>{property?.description || "no description"}</Balancer>
        </p>
        <div className={styles.priceInfo}>
          <p> {currencyFormator(property?.prices?.[0] || 0)}</p>
          <CustomButton
            fit
            onClick={() =>
              navigate(`/property/${property?._id}`, {
                state: { prices: property?.prices },
              })
            }
          >
            View Details
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
