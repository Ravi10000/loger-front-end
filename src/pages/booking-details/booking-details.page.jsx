import styles from "./booking-details.page.module.scss";
import ReactDOMServer from "react-dom/server";
import html2pdf from "html2pdf.js/dist/html2pdf.min";

import { Balancer } from "react-wrap-balancer";
import { PiPrinter } from "react-icons/pi";
import { useQuery } from "@tanstack/react-query";
import { fetchTransactionAndBooking } from "#api/transaction.req";
import { useParams } from "react-router-dom";
import LoadingPage from "#pages/loading/loading";
import dayjs from "dayjs";
import { currencyFormator } from "#utils/currency-formator";
import Stars from "#components/stars/stars";
import { fetchProperty } from "#api/properties.req";
import PropTypes from "prop-types";

function BookingDetailsPage() {
  const totalStars = 5;
  const { transactionId } = useParams();

  // bookingQuery.isF

  const bookingQuery = useQuery({
    queryKey: ["booking"],
    queryFn: async () => {
      const bookingResposne = await fetchTransactionAndBooking(transactionId);
      return bookingResposne?.data;
    },
  });

  const propertyQuery = useQuery({
    queryKey: ["property", bookingQuery?.data?.booking?.propertyId],
    enabled: !!bookingQuery?.data?.booking?.propertyId,
    queryFn: async () => {
      try {
        const res = await fetchProperty(
          bookingQuery?.data?.booking?.propertyId
        );
        console.log({ res });
        return res?.data || {};
      } catch (err) {
        console.log("error while fetching property");
        console.error({ err: err?.response?.data });
      }
    },
  });

  const transaction = bookingQuery?.data?.transaction;
  const booking = bookingQuery?.data?.booking;
  const isPropertyLoading = propertyQuery?.isLoading;
  const property = propertyQuery?.data?.property;
  const pkgDetails = booking?.pkgDetails && JSON.parse(booking?.pkgDetails);
  // const paymentResponse =
  //   transaction?.response && JSON.parse(transaction?.response);

  console.log({ booking, transaction, property, pkgDetails });

  const StatusUI = {
    paid: "Thank You. Your Booking is Now Being Processed",
    confirmed: "Thank You. Your Booking is Now Confirmed",
    pending: "Your Payment Transaction is Pending",
    cancelled: "Your Booking is Cancelled",
  };
  const tripLength = dayjs(booking?.checkOutDate).diff(
    booking?.checkInDate,
    "day"
  );

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

  const ContentToPrint = () => {
    return (
      <div style={{ padding: "20px" }}>
        <div
          className={styles.contentBox}
          style={{
            padding: "20px",
            background: "#f9f9fa",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "800px",
          }}
        >
          <img
            src="/images/logos/loger-logo.png"
            alt="loger.ma"
            style={{ height: "70px", width: "fit-content", marginLeft: "20px" }}
          />
          <div
            className={styles.details}
            style={{
              width: "100%",
              padding: "20px",
              paddingTop: 0,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              style={{
                borderBottom: "2px solid #d0d0d079",
                paddingBottom: "10px",
                width: "100%",
              }}
            >
              <h3>Booking Details</h3>
            </div>
            <Info
              name="Booking No."
              value={new Date(booking?.createdAt).getTime()}
            />
            <Info
              name="Booking Date"
              value={dayjs(booking?.createdAt).format("DD/MM/YYYY")}
            />
            <Info
              name="Check-In Date"
              value={dayjs(booking?.checkInDate).format("DD/MM/YYYY")}
            />
            <Info
              name="Check-Out Date"
              value={dayjs(booking?.checkOutDate).format("DD/MM/YYYY")}
            />
            <Info
              name="Total Length of Stay"
              value={`${tripLength} day${tripLength > 1 && "s"}`}
            />
            <Info name="First Name" value={transaction?.firstName} />

            {transaction?.lastName && (
              <Info name="Last Name" value={transaction?.lastName} />
            )}
            <Info
              name="Phone Number"
              value={`${transaction?.countryCode} ${transaction?.phone}`}
            />
            <Info name="Email Address" value={transaction?.email} />

            {isPropertyLoading ? (
              <p style={{ fontWeight: "500", textAlign: "center" }}>
                loading...
              </p>
            ) : (
              <>
                <Info name="Street" value={property?.address} />
                <Info name="State/City" value={property?.city} />
                <Info name="Pincode" value={property?.pincode} />
                <Info name="Country" value={property?.country} />
              </>
            )}
          </div>
          {booking?.specailRequests && (
            <>
              <div
                className={styles.bottomContainer}
                style={{
                  padding: "10px 20px",
                  borderBottom: "1px solid #e5e5e5",
                }}
              >
                <h3>Special Requests</h3>
                <p>{booking?.specailRequests}</p>
              </div>
            </>
          )}
          {transaction?.status === "paid" && (
            <p
              className={styles.lastMessage}
              style={{ color: "#00c964", fontWeight: 600, padding: "0 20px" }}
            >
              We Wish You a Pleasant Stay
            </p>
          )}
        </div>
      </div>
    );
  };

  function handlePrint() {
    const printElement = ReactDOMServer.renderToString(<ContentToPrint />);
    html2pdf()
      .from(printElement)
      .set({
        html2canvas: { scale: 5 },
        filename: `Booking_Receipt_${Date.now()}.pdf`,
      })
      .save();
  }

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
            <button
              className={styles.print}
              onClick={handlePrint}
              disabled={isPropertyLoading}
            >
              <PiPrinter className={styles.icon} />
              <p>Print</p>
            </button>
          </div>
        </div>
      )}
      <div className={styles.container} style={{ width: "100%" }}>
        <div className={styles.contentBox} style={{ width: "100%" }}>
          {isPropertyLoading ? (
            <div
              style={{
                width: "100vw",
                maxWidth: "800px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "400px",
              }}
            >
              <LoadingPage.Loader></LoadingPage.Loader>
            </div>
          ) : (
            <>
              <p>{StatusUI?.[booking?.status]}</p>
              <div className={styles.details}>
                <h3>Your Booking Details</h3>
                <div className={styles.info}>
                  <p>Booking No.</p>
                  <p>{new Date(booking?.createdAt).getTime()}</p>
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
                {isPropertyLoading ? (
                  <p style={{ fontWeight: "500", textAlign: "center" }}>
                    loading...
                  </p>
                ) : (
                  <>
                    <div className={styles.info}>
                      <p>Street</p>
                      <p>{property?.address}</p>
                    </div>
                    <div className={styles.info}>
                      <p>States/City</p>
                      <p>{property?.city}</p>
                    </div>
                    <div className={styles.info}>
                      <p>Pin Code</p>
                      <p>{property?.pincode}</p>
                    </div>
                    <div className={styles.info}>
                      <p>Country</p>
                      <p>{property?.country}</p>
                    </div>
                  </>
                )}
              </div>
              {booking?.specailRequests && (
                <>
                  <div className={styles.bottomContainer}>
                    <h3>Special Requests</h3>
                    <p>{booking?.specailRequests}</p>
                  </div>
                </>
              )}
              {transaction?.status === "paid" && (
                <p className={styles.lastMessage}>
                  We Wish You a Pleasant Stay
                </p>
              )}
            </>
          )}
        </div>
        <div className={styles.contentBox}>
          <div className={styles.head}>
            <div className={styles.titleContainer}>
              <h3>{property?.propertyName}</h3>
              <p>{property?.state}</p>
            </div>
            <div className={styles.ratingsContainer}>
              <p style={{ textAlign: "end" }}>
                {property?.averageRating} / {totalStars}
              </p>
              <Stars ratings={property?.averageRating} size={18} />
            </div>
          </div>
          <div className={styles.featureList}>
            {/* <div className={styles.item}>
              <h4>Double Bed Room</h4>
              <p>10/10 Exceptional</p>
            </div> */}
            {/* <div className={styles.item}>
              <h4>Breakfast</h4>
              <p>Morning Breakfast at 8:30 am</p>
            </div> */}
            {/* <div className={styles.item}>
              <h4>Extra Bed</h4>
              <p>1 Bed or 2 Twin Beds</p>
            </div> */}
            {/* <div className={styles.item}>
              <h4>Car Parking</h4>
              <p>Free Parking</p>
            </div> */}
            <div className={styles.item}>
              <h4>Family Details</h4>
              <p>
                {pkgDetails?.noOfAdults} Adult
                {pkgDetails?.noOfAdults > 1 && "s"}
              </p>
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
                {/* {pkgDetails?.noOfRooms} Rooms, for {pkgDetails?.noOfAdults}{" "} */}
                {/* People,  */}
                {tripLength} Day{tripLength > 1 && "s"}
              </p>
            </div>
            {/* <div className={styles.item}>
              <h4>Cancelation</h4>
              <p>Free Cancelation</p>
            </div> */}
          </div>
          <div className={styles.breakdown}>
            {/* <h4>Package Amount</h4>
            <p>{currencyFormator(transaction?.amount)}</p>
            <h4>Genius Discount</h4>
            <p>
              -
              {currencyFormator(
                transaction?.amount - transaction?.discountedAmount
              )}
            </p> */}
            <h4>Paid Amount</h4>
            <p className={styles.finalPrice}>
              {currencyFormator(transaction?.discountedAmount)}
            </p>
          </div>
          <div className={styles.bottomMessage}>
            <h3>Need Help Booking?</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&;s standard dummy text
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

Info.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

function Info({ name, value }) {
  return (
    <div
      className={styles.info}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "20px",
      }}
    >
      <p style={{ fontWeight: "700" }}>{name}</p>
      <p>{value}</p>
    </div>
  );
}

export default BookingDetailsPage;
