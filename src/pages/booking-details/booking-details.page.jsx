import styles from "./booking-details.page.module.scss";

import { Balancer } from "react-wrap-balancer";
import { PiPrinter } from "react-icons/pi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { fetchTransactionAndBooking } from "#api/transaction.req";
import { useParams } from "react-router-dom";
import LoadingPage from "#pages/loading/loading";
import dayjs from "dayjs";
import { currencyFormator } from "#utils/currency-formator";
import Stars from "#components/stars/stars";

function BookingDetailsPage() {
  const totalStars = 5;
  const rating = 3;
  const { transactionId } = useParams();

  // bookingQuery.isF

  const bookingQuery = useQuery({
    queryKey: ["booking"],
    queryFn: async () => {
      const bookingResposne = await fetchTransactionAndBooking(transactionId);
      return bookingResposne?.data;
    },
  });
  const transaction = bookingQuery?.data?.transaction;
  const booking = bookingQuery?.data?.booking;
  const property = bookingQuery?.data?.booking?.property;
  const pkgDetails = booking?.pkgDetails && JSON.parse(booking?.pkgDetails);
  const paymentResponse =
    transaction?.response && JSON.parse(transaction?.response);

  console.log({ booking, transaction, property, pkgDetails });

  const StatusUI = {
    paid: "Thank You. Your Booking is Now Being Processed",
    confirmed: "Thank You. Your Booking is Now Confirmed",
    pending: "Your Payment Transaction is Pending",
    cancelled: "Your Booking is Cancelled",
  };

  if (bookingQuery.isLoading) return <LoadingPage />;
  if (bookingQuery.isError)
    return (
      <div className={styles.error}>
        <h2>
          <Balancer>
            Something went wrong while fetching your booking details
          </Balancer>
        </h2>
      </div>
    );

  return (
    <div className={styles.bookingDetailsPage}>
      {transaction?.status === "success" && (
        <div className={styles.coloredContainer}>
          <div className={styles.container}>
            <div className={styles.titleContainer}>
              <h1 className={styles.title}>
                <Balancer>Congratulation</Balancer>
              </h1>
              <p className={styles.subtitle}>
                <Balancer>Welcome to {property?.propertyName}</Balancer>
              </p>
            </div>
            <button className={styles.print} onClick={() => window.print()}>
              <PiPrinter className={styles.icon} />
              <p>Print</p>
            </button>
          </div>
        </div>
      )}
      <div className={styles.container}>
        <div className={styles.contentBox}>
          <p>{StatusUI?.[booking?.status]}</p>
          <div className={styles.details}>
            <h3>Your Booking Details</h3>
            <div className={styles.info}>
              <p>Booking No.</p>
              <p>{booking?._id}</p>
            </div>
            <div className={styles.info}>
              <p>First Name</p>
              <p>{transaction?.firstName}</p>
            </div>
            {transaction?.lastName && (
              <div className={styles.info}>
                <p>Last Name</p>
                <p>{transaction?.lastName}</p>
              </div>
            )}
            <div className={styles.info}>
              <p>Phone Number</p>
              <p>
                {transaction?.countryCode} {transaction?.phone}
              </p>
            </div>
            <div className={styles.info}>
              <p>Email Address</p>
              <p>{transaction?.email}</p>
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
          {booking?.specailRequests && (
            <>
              <div className={styles.bottomContainer}>
                <h3>Special Requests</h3>
                <p>{booking?.specailRequests}</p>
              </div>
              <div className={styles.bottomContainer}>
                <h3>Payment By</h3>
                <p>Credit Card</p>
              </div>
              <p className={styles.lastMessage}>We Wish You a Pleasant Stay</p>
            </>
          )}
          {/* <div className={styles.bottomContainer}>
              <h3>Payment Information</h3>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic type setting
              </p>
            </div> */}
        </div>
        <div className={styles.contentBox}>
          <div className={styles.head}>
            <div className={styles.titleContainer}>
              <h3>{property?.propertyName}</h3>
              <p>{property?.state}</p>
            </div>
            <div className={styles.ratingsContainer}>
              {/* <div className={styles.stars}>
                {[...Array(rating)].map((_, i) => (
                  <AiFillStar className={styles.star} key={i} />
                ))}
                {[...Array(totalStars - rating)].map((_, i) => (
                  <AiOutlineStar className={styles.star} key={i + rating} />
                ))}
              </div> */}
              <Stars ratings={property?.averageRating} size={20} />
              <p>
                {property?.averageRating} / {totalStars}
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
              <p>{pkgDetails?.noOfAdults} Adults</p>
            </div>
            <div className={styles.item}>
              <h4>Check - In</h4>
              <p>{dayjs(booking?.checkInDate).format("DD/MM/YYYY")}</p>
            </div>
            <div className={styles.item}>
              <h4>Check - Out</h4>
              <p>{dayjs(booking?.checkOutDate).format("DD/MM/YYYY")}</p>
            </div>
            <div className={styles.item}>
              <h4>Total Length of Stay</h4>
              <p>
                {pkgDetails?.noOfRooms} Rooms, for {pkgDetails?.noOfAdults}{" "}
                People,{" "}
                {dayjs(booking?.checkOutDate).diff(
                  booking?.checkInDate,
                  "day"
                ) + 1}{" "}
                Days
              </p>
            </div>
            <div className={styles.item}>
              <h4>Cancelation</h4>
              <p>Free Cancelation</p>
            </div>
          </div>
          <div className={styles.breakdown}>
            <h4>Package Amount</h4>
            <p>{currencyFormator(transaction?.amount)}</p>
            {/* <h4>Getaway Deal</h4>
            <p>- ₹ 768.60</p> */}
            <h4>Genius Discount</h4>
            <p>
              -
              {currencyFormator(
                transaction?.amount - transaction?.discountedAmount
              )}
            </p>
            <h4>Final Amount</h4>
            <p className={styles.finalPrice}>
              {currencyFormator(transaction?.discountedAmount)}
            </p>
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
