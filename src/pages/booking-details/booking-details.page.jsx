import styles from "./booking-details.page.module.scss";

import { Balancer } from "react-wrap-balancer";
import { PiPrinter } from "react-icons/pi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

function BookingDetailsPage() {
  const totalStars = 5;
  const rating = 3;
  return (
    <div className={styles.bookingDetailsPage}>
      <div className={styles.coloredContainer}>
        <div className={styles.container}>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>
              <Balancer>Congratulation</Balancer>
            </h1>
            <p className={styles.subtitle}>
              <Balancer>
                Welcome to Tirath View, Haridwar - A Four Star Luxury
              </Balancer>
            </p>
          </div>
          <button className={styles.print} onClick={() => window.print()}>
            <PiPrinter className={styles.icon} />
            <p>Print</p>
          </button>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.contentBox}>
          <p>Thank You. Your Booking is Now Confirmed</p>
          <div className={styles.details}>
            <h3>Your Booking Details</h3>
            <div className={styles.info}>
              <p>Booking No.</p>
              <p>1236547890</p>
            </div>
            <div className={styles.info}>
              <p>First Name</p>
              <p>Anil</p>
            </div>
            <div className={styles.info}>
              <p>Last Name</p>
              <p>Sogra</p>
            </div>
            <div className={styles.info}>
              <p>Phone Number</p>
              <p>+91 888 215 7770</p>
            </div>
            <div className={styles.info}>
              <p>Email Address</p>
              <p>anilsogra125@gmail.com</p>
            </div>
            <div className={styles.info}>
              <p>Street</p>
              <p>1080, Northem Gate, Post Box 1442, Jama Masjid</p>
            </div>
            <div className={styles.info}>
              <p>States/City</p>
              <p>New Delhi</p>
            </div>
            <div className={styles.info}>
              <p>Pin Code</p>
              <p>110006</p>
            </div>
            <div className={styles.info}>
              <p>Country</p>
              <p>India</p>
            </div>
          </div>
          <div className={styles.bottomContainer}>
            <h3>Any special requests?</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic type setting
            </p>
          </div>
          <div className={styles.bottomContainer}>
            <h3>Payment Information</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic type setting
            </p>
          </div>
          <div className={styles.bottomContainer}>
            <h3>Payment By</h3>
            <p>Credit Card</p>
          </div>
          <p className={styles.lastMessage}>We Wish You a Pleasant Stay</p>
        </div>
        <div className={styles.contentBox}>
          <div className={styles.head}>
            <div className={styles.titleContainer}>
              <h3>Best Reviews</h3>
              <p>Haridwar, India</p>
            </div>
            <div className={styles.ratingsContainer}>
              <div className={styles.stars}>
                {[...Array(rating)].map((_, i) => (
                  <AiFillStar className={styles.star} key={i} />
                ))}
                {[...Array(totalStars - rating)].map((_, i) => (
                  <AiOutlineStar className={styles.star} key={i + rating} />
                ))}
              </div>
              <p>
                {rating} / {totalStars}
              </p>
            </div>
          </div>
          <div className={styles.featureList}>
            <div className={styles.item}>
              <h4>Double Bed Room</h4>
              <p>10/10 Exceptional</p>
            </div>
            <div className={styles.item}>
              <h4>Breakfast</h4>
              <p>Morning Breakfast at 8:30 am</p>
            </div>
            <div className={styles.item}>
              <h4>Extra Bed</h4>
              <p>1 Bed or 2 Twin Beds</p>
            </div>
            <div className={styles.item}>
              <h4>Car Parking</h4>
              <p>Free Parking</p>
            </div>
            <div className={styles.item}>
              <h4>Family Details</h4>
              <p>2 Adult 1 Children</p>
            </div>
            <div className={styles.item}>
              <h4>Check - In</h4>
              <p>05/07/2023</p>
            </div>
            <div className={styles.item}>
              <h4>Check - Out</h4>
              <p>05/07/2023</p>
            </div>
            <div className={styles.item}>
              <h4>Total Length of Stay</h4>
              <p>2 Night, 3 Days, 3 People, 1 Room</p>
            </div>
            <div className={styles.item}>
              <h4>Cancelation</h4>
              <p>Free Cancelation</p>
            </div>
          </div>
          <div className={styles.breakdown}>
            <h4>Total Price</h4>
            <p>₹ 3,500</p>
            <h4>Getaway Deal</h4>
            <p>- ₹ 768.60</p>
            <h4>Genius Discount</h4>
            <p>- ₹ 1,120</p>
          </div>
          <div className={styles.bottomMessage}>
            <h3>Need Help Booking?</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingDetailsPage;
