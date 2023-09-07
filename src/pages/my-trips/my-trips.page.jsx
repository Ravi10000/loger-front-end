import styles from "./my-trips.page.module.scss";

import { useState } from "react";
import { PiArrowLeftBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { trips } from "#data/trips.data";
import Balancer from "react-wrap-balancer";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiStarFill } from "react-icons/ri";

const tabs = [
  {
    title: "Upcoming Trips",
    subtitle:
      "Upcoming Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy Lorem Ipsum is simply the printing and Lorem Ipsum is simply dummy",
    tab: "Upcoming",
    status: "active",
    Component: <h1>upcoming trips</h1>,
  },
  {
    title: "Cancelled Trips",
    subtitle:
      "Cancelled Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy Lorem Ipsum is simply the printing and Lorem Ipsum is simply dummy",
    tab: "Cancelled",
    status: "cancelled",
    Component: <h1>cancelled trips</h1>,
  },
  {
    title: "Completed Trips",
    subtitle:
      "Completed Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy Lorem Ipsum is simply the printing and Lorem Ipsum is simply dummy",
    tab: "Completed",
    status: "completed",
    Component: <h1>completed trips</h1>,
  },
];

function MyTripsPage() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  return (
    <div className={styles.myTripsPage}>
      <div className={styles.head}>
        <div className={styles.link} onClick={() => navigate("/")}>
          <PiArrowLeftBold className={styles.icon} />
          <p>See all properties</p>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.tabsContainer}>
          <h1>My Trips</h1>
          <div className={styles.tabSwitcher}>
            {tabs?.map((tab) => (
              <button
                className={`${styles.tab} ${
                  tab?.tab === selectedTab?.tab ? styles.selected : ""
                }`}
                key={tab?.tab}
                onClick={() => setSelectedTab(tab)}
              >
                {tab?.tab}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.cardsContainer}>
          <div className={styles.cardsHeading}>
            <h2>{selectedTab?.title}</h2>
            <p>
              <Balancer>{selectedTab?.subtitle}</Balancer>
            </p>
          </div>
          {trips
            ?.filter((trip) => trip?.status === selectedTab?.status)
            ?.map((trip) => (
              <TripCard trip={trip} />
            ))}
          {/* <TripCard trip={trips[0]} />
          <TripCard trip={trips[1]} />
          <TripCard trip={trips[2]} />
          <TripCard trip={trips[3]} /> */}
        </div>
      </div>
    </div>
  );
}

function TripCard({ trip }) {
  const [isSaved, setIsSaved] = useState(false);
  return (
    <div className={styles.tripCardContainer}>
      <div className={styles.tripCard}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url("${trip?.image}")` }}
        >
          <div
            className={styles.iconContainer}
            onClick={() => setIsSaved((prevState) => !prevState)}
          >
            {isSaved ? (
              <AiFillHeart className={`${styles.icon} ${styles.liked}`} />
            ) : (
              <AiOutlineHeart className={`${styles.icon}`} />
            )}
          </div>
        </div>
        <div className={styles.tripInfo}>
          <h3>
            <Balancer>{trip?.name}</Balancer>
          </h3>
          <div className={styles.location}>
            <p>
              {trip?.location} - <span>location</span>
            </p>
            <HiOutlineLocationMarker className={styles.icon} />
          </div>
          <div className={styles.description}>
            <h4>Description</h4>
            <p>
              <Balancer>{trip?.description}</Balancer>
            </p>
          </div>
        </div>
        <div className={styles.bottomSection}>
          <div className={styles.priceContainer}>
            <p>Per Night</p>
            <p className={styles.priceText}>₹ {trip?.price}</p>
            <p>₹ 100 taxes and charges</p>
          </div>
          <button className={`${styles.button} ${styles?.[trip?.status]}`}>
            {trip?.status === "active"
              ? "Cancel Your Trip"
              : trip?.status === "cancelled"
              ? "Cancelled"
              : "Reserve Again"}
          </button>
        </div>
      </div>
      {trip?.status === "active" && (
        <div className={`${styles.extraInfo} ${styles.active}`}>
          <h4>
            <Balancer>Your Journey Will Start On</Balancer>
          </h4>
          <div className={styles.dateNTime}>
            <div className={styles.date}>
              <img src="/images/icons/calendar.svg" alt="calender" />
              <p>{trip?.startDate}</p>
            </div>
            <div className={styles.date}>
              <img src="/images/icons/clock.svg" alt="calender" />
              <p>{trip?.startTime}</p>
            </div>
          </div>
          <p className={styles.link}>Privacy Policy</p>
        </div>
      )}
      {trip?.status === "cancelled" && trip?.refundStatus === "success" ? (
        <div className={styles.extraInfo}>
          <h3>Refund</h3>
          <p className={styles.successText}>Successfull</p>
          <p className={styles.link}>Privacy Policy</p>
        </div>
      ) : (
        trip?.status === "cancelled" && (
          <div className={styles.extraInfo}>
            <h4>
              <Balancer>
                Refund initiated, will be creadited under 24hr
              </Balancer>
            </h4>
            <div className={styles.date}>
              <img src="/images/icons/clock.svg" alt="calender" />
              <p>10h 58m 15s</p>
            </div>
            <p className={styles.link}>Privacy Policy</p>
          </div>
        )
      )}
      {trip?.status === "completed" && (
        <div className={styles.extraInfo}>
          <div className={styles.rating}>
            <div className={styles.stars}>
              {Array(4)
                .fill()
                .map((_, i) => (
                  <RiStarFill key={i} className={styles.star} />
                ))}
            </div>
            <p>4.0</p>
          </div>

          <p>Reviews(150)</p>
          <button className={styles.reviewBtn}>Write Your Review</button>
        </div>
      )}
    </div>
  );
}

export default MyTripsPage;
