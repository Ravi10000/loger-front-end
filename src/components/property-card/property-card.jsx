import styles from "./property-card.module.scss";
import CustomButton from "#components/custom-button/custom-button";
import { RiStarFill } from "react-icons/ri";
import Balancer from "react-wrap-balancer";
import { useNavigate } from "react-router-dom";
function PropertyCard({ item }) {
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
            item?.photos?.[0]?.photoUrl
              ? import.meta.env.VITE_SERVER_URL +
                "/images/" +
                item?.photos?.[0]?.photoUrl
              : "/images/property (1).png"
          }")`,
        }}
      ></div>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <h3>
            <Balancer>{item?.propertyName || "no name"}</Balancer>
          </h3>
          <div className={styles.rating}>
            <div className={styles.stars}>
              {Array(item?.rating || 1)
                .fill()
                .map((_, i) => (
                  <RiStarFill key={i} className={styles.star} />
                ))}
            </div>
            <p>{item?.rating || 1}.0</p>
          </div>
        </div>
        <div className={styles.location}>
          <img src="/images/icons/location.svg" alt="location" />
          <p>
          {item?.country}, {item?.city}
          </p>
        </div>
        <p className={styles.description}>
          <Balancer>{item?.description || "no description"}</Balancer>
        </p>
        <div className={styles.priceInfo}>
          <p>₹ {item?.price || 0}</p>
          <CustomButton fit onClick={() => navigate("/property")}>
            View Details
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
