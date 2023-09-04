import styles from "./search-result-card.module.scss";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Balancer } from "react-wrap-balancer";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiStarFill } from "react-icons/ri";
import CustomButton from "#components/custom-button/custom-button";
import { useNavigate } from "react-router-dom";

function SearchResultCard({ property }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      className={styles.searchResultCard}
      onClick={() => navigate("/property")}
    >
      <div className={styles.imageContainer}>
        <img src="/images/property (2).png" alt="property" />
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
            <Balancer>{property?.title}</Balancer>
          </h3>
          <div className={styles.locationContainer}>
            <p>
              {property?.location} - <span>location</span>
            </p>
            <HiOutlineLocationMarker className={styles.locationIcon} />
          </div>
          <div className={styles.description}>
            <h4>Description</h4>
            <p>{property?.description}</p>
          </div>
          <h4>{property?.roomType}</h4>
          <div className={styles.services}>
            <h4>Services</h4>
            <div className={styles.servicesGroup}>
              <img src="/images/services-icons/bed.svg" alt="" />
              <img src="/images/services-icons/pool.svg" alt="" />
              <img src="/images/services-icons/wifi.svg" alt="" />
              <img src="/images/services-icons/plane.svg" alt="" />
              <img src="/images/services-icons/phone.svg" alt="" />
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
            <p className={styles.amount}>₹ {property?.price}</p>
            <p>₹ 100 taxes and charges</p>
          </div>
          <div className={styles.btnContainer}>
            <CustomButton>Check Availabilities</CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResultCard;
