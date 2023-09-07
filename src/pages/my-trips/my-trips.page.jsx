import styles from "./my-trips.page.module.scss";

import { useState } from "react";
import { PiArrowLeftBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Balancer from "react-wrap-balancer";
import TripCard from "#components/trip-card/trip-card";

import { trips } from "#data/trips.data";

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
  const filteredTrips = trips?.filter(
    (trip) => trip?.status === selectedTab?.status
  );
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
        {selectedTab?.tab === "Upcoming" && filteredTrips?.length < 1 ? (
          <div className={styles.cardsContainer}>
            <div className={styles.cardsHeading}>
              <h2>No Trips Booked.....Yet!</h2>
              <p>
                <Balancer>
                  Lorem Ipsum is simply dummy text of the printing and Lorem
                  Ipsum is simply dummy Lorem Ipsum is simply dummy text of the
                  printing and Lorem Ipsum is simply dummy
                </Balancer>
              </p>
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.searchButton}>
                Search Your Bookings
              </button>
              {/* <img src="/images/no-upcoming-trips.png" alt="" /> */}
            </div>
          </div>
        ) : (
          <div className={styles.cardsContainer}>
            <div className={styles.cardsHeading}>
              <h2>{selectedTab?.title}</h2>
              <p>
                <Balancer>{selectedTab?.subtitle}</Balancer>
              </p>
            </div>
            {filteredTrips?.map((trip) => (
              <TripCard trip={trip} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTripsPage;
