import styles from "./property-card.module.scss";
import CustomButton from "#components/custom-button/custom-button";
import { RiStarFill } from "react-icons/ri";
import Balancer from "react-wrap-balancer";
import { useNavigate } from "react-router-dom";
function PropertyCard({ item }) {
  const navigate = useNavigate();
  return (
    <div className={styles.propertyCard}>
      <img className={styles.propertyImage} src={item?.image} alt="property" />
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <h3>
            <Balancer>{item?.name}</Balancer>
          </h3>
          <div className={styles.rating}>
            <div className={styles.stars}>
              {Array(item?.rating)
                .fill()
                .map((_, i) => (
                  <RiStarFill key={i} className={styles.star} />
                ))}
            </div>
            <p>{item?.rating}.0</p>
          </div>
        </div>
        <div className={styles.location}>
          <img src="/images/icons/location.svg" alt="location" />
          <p>{item?.location}</p>
        </div>
        <p className={styles.description}>
          <Balancer>{item?.description}</Balancer>
        </p>
        <div className={styles.priceInfo}>
          <p>₹ {item?.price}</p>
          <CustomButton fit onClick={() => navigate("/property")}>
            View Details
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
