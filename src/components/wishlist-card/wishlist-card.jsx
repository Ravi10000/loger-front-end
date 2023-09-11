import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import styles from "./wishlist-card.module.scss";
import { IoClose } from "react-icons/io5";
import CustomButton from "#components/custom-button/custom-button";
import { HiOutlineLocationMarker } from "react-icons/hi";

function WishlistCard({ wish }) {
  return (
    <div className={styles.wishlistCard}>
      <div
        className={styles.image}
        style={{
          backgroundImage: `url("${wish?.image}")`,
        }}
      >
        <div className={styles.iconContainer}>
          <IoClose className={styles.close} />
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.titleContainer}>
          <h3>{wish?.title}</h3>
          <p className={styles.location}>
            {wish?.location} -{" "}
            <span>
              location <HiOutlineLocationMarker />
            </span>
          </p>
        </div>
        <div className={styles.description}>
          <h4>Description</h4>
          <p>{wish?.description}</p>
        </div>
        <div className={styles.feature}>
          <h3>{wish?.roomType}</h3>
          <p>{wish?.beds}</p>
        </div>
        <div className={styles.servicesContainer}>
          <h3>Services</h3>
          <p>Lorem Ipsum is simply dummy text of the printing and</p>
          <div className={styles.services}>
            <img src="/images/services-icons/wifi.svg" alt="" />
            <img src="/images/services-icons/bed.svg" alt="" />
            <img src="/images/services-icons/pool.svg" alt="" />
            <img src="/images/services-icons/plane.svg" alt="" />
            <img src="/images/services-icons/phone.svg" alt="" />
          </div>
        </div>
      </div>
      <div className={styles.priceNReviews}>
        <div className={styles.review}>
          <div className={styles.rating}>
            {Array.from({ length: wish?.rating }, (_, i) => (
              <AiFillStar className={styles.star} key={i} />
            ))}
            {Array.from({ length: 5 - wish?.rating }, (_, i) => (
              <AiOutlineStar className={styles.star} key={wish?.rating + i} />
            ))}
            <p>{wish?.rating}.0</p>
          </div>
          <p>Reviews ({wish?.reviews})</p>
        </div>
        <div className={styles.price}>
          <p>Per Night</p>
          <h3>₹ {wish?.price}</h3>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <CustomButton>Check Availabilities</CustomButton>
      </div>
    </div>
  );
}

export default WishlistCard;
