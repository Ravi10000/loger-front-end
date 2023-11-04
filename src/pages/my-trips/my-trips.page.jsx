import styles from "./my-trips.page.module.scss";

import { useEffect, useState } from "react";
import { PiArrowLeftBold } from "react-icons/pi";
import { useNavigate, useParams } from "react-router-dom";
import Balancer from "react-wrap-balancer";
import TripCard from "#components/trip-card/trip-card";
import { useQuery } from "@tanstack/react-query";
import { getBookings } from "#api/bookings.req";
import CancelBookingPopup from "#components/cancel-booking-popup/cancel-booking-popup";

const tabs = {
  upcomming: {
    title: "Upcoming Trips",
    subtitle:
      "Upcoming Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy Lorem Ipsum is simply the printing and Lorem Ipsum is simply dummy",
    tab: "Upcoming",
    status: "upcomming",
  },
  cancelled: {
    title: "Cancelled Trips",
    subtitle:
      "Cancelled Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy Lorem Ipsum is simply the printing and Lorem Ipsum is simply dummy",
    tab: "Cancelled",
    status: "cancelled",
  },
  completed: {
    title: "Completed Trips",
    subtitle:
      "Completed Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy Lorem Ipsum is simply the printing and Lorem Ipsum is simply dummy",
    tab: "Completed",
    status: "completed",
  },
};

function MyTripsPage() {
  const { status } = useParams();
  const navigate = useNavigate();
  const selectedTab = tabs[status];
  const bookingsQuery = useQuery({
    queryKey: ["bookings", selectedTab?.status],
    queryFn: async () => {
      const response = await getBookings(selectedTab?.status);
      return response?.data;
    },
  });
  const [bookingToCancel, setBookingToCancel] = useState(null);

  const bookings = bookingsQuery?.data?.bookings;
  console.log({ bookings });

  return (
    <div className={styles.myTripsPage}>
      {bookingToCancel && (
        <CancelBookingPopup
          bookingId={bookingToCancel}
          close={() => setBookingToCancel(null)}
        />
      )}
      <div className={styles.head}>
        <div className={styles.link} onClick={() => navigate("/")}>
          <PiArrowLeftBold className={styles.icon} />
          <p>Go Back</p>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.tabsContainer}>
          <h1>My Trips</h1>
          <div className={styles.tabSwitcher}>
            {Object.keys(tabs)?.map((tab) => (
              <button
                key={tab}
                className={`${styles.tab} ${
                  tabs?.[tab].tab === selectedTab?.tab ? styles.selected : ""
                }`}
                onClick={() => navigate(`/my-trips/${tab}`)}
              >
                {tabs?.[tab].tab}
              </button>
            ))}
          </div>
        </div>
        {selectedTab?.tab === "Upcoming" && bookings?.length < 1 ? (
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
            {bookings?.map((booking) => (
              <TripCard
                setBookingToCancel={setBookingToCancel}
                booking={{ ...booking, status: selectedTab?.status }}
                key={booking?._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTripsPage;
