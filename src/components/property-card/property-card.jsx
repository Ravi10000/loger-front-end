import styles from "./property-card.module.scss";
import CustomButton from "#components/custom-button/custom-button";
import { RiStarFill } from "react-icons/ri";
import Balancer from "react-wrap-balancer";
function PropertyCard({ property }) {
  return (
    <div className={styles.propertyCard}>
      <img
        className={styles.propertyImage}
        src={property?.image}
        alt="property"
      />
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <h3>
            <Balancer>{property?.name}</Balancer>
          </h3>
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
        </div>
        <div className={styles.location}>
          <img src="/images/icons/location.svg" alt="location" />
          <p>{property?.location}</p>
        </div>
        <p className={styles.description}>
          <Balancer>{property?.description}</Balancer>
        </p>
        <div className={styles.priceInfo}>
          <p>₹ {property?.price}</p>
          <CustomButton fit>View Details</CustomButton>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
