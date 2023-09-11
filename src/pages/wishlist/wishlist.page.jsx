import styles from "./wishlist.page.module.scss";

import Search from "#components/search/search";
import { PiArrowLeftBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Balancer from "react-wrap-balancer";
import { AiFillHeart } from "react-icons/ai";
import WishlistCard from "#components/wishlist-card/wishlist-card";

const wish = {
  _id: 1,
  title: "The Grand Hotel",
  location: "New York, USA",
  description:
    "Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has industry",
  roomType: "Standard King Room",
  beds: "1 Double bed",
  rating: 4,
  reviews: 150,
  price: 3_500,
  image: "/images/property/one.png",
};

function WishlistPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.wishlistPage}>
      <div className={styles.head}>
        <div className={styles.headContent}>
          <div className={styles.iconLink} onClick={() => navigate(-1)}>
            <PiArrowLeftBold className={`${styles.backIcon} ${styles.icon}`} />
            <p>Go Back</p>
          </div>
          <h1>
            <Balancer>Choose Your Next Trip</Balancer>
          </h1>
          <Search />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.contentHeader}>
            <div className={styles.left}>
              <h2>Wishlist</h2>
              <div className={styles.iconContainer}>
                <AiFillHeart className={styles.icon} />
              </div>
            </div>
            <p className={styles.link}>View All</p>
          </div>
          <div className={styles.cardsContainer}>
            <WishlistCard wish={wish} />
            <WishlistCard wish={wish} />
            <WishlistCard wish={wish} />
            <WishlistCard wish={wish} />
            <WishlistCard wish={wish} />
            <WishlistCard wish={wish} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WishlistPage;
