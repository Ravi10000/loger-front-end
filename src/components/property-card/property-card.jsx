import styles from "./property-card.module.scss";

import { useNavigate } from "react-router-dom";
import Balancer from "react-wrap-balancer";
import PropTypes from "prop-types";

import Stars from "#components/stars/stars";
import CustomButton from "#components/custom-button/custom-button";

import { currencyFormator } from "#utils/currency-formator";

PropertyCard.propTypes = {
  property: PropTypes.object.isRequired,
};

function PropertyCard({ property }) {
  const navigate = useNavigate();
  const mainPhoto = property?.photos?.find((photo) => photo.isMain);
  const mainPhotoUrl = mainPhoto?.photoUrl || property?.photos?.[0]?.photoUrl;
  return (
    <div className={styles.propertyCard}>
      <div
        className={styles.propertyImage}
        style={{
          opacity: mainPhotoUrl ? 1 : 0.25,
          backgroundImage: `url("${
            mainPhotoUrl
              ? import.meta.env.VITE_SERVER_URL + "/images/" + mainPhotoUrl
              : "/images/blank-image.png"
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
            onClick={() => navigate(`/property/${property?._id}`)}
          >
            View Details
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
