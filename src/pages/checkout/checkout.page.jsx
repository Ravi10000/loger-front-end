import styles from "./checkout.page.module.scss";

import { useEffect, useRef, useState } from "react";

import { HiOutlineChevronRight } from "react-icons/hi";
import { Balancer } from "react-wrap-balancer";
import CustomCheckbox from "#components/custom-checkbox/custom-checkbox";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import CustomButton from "#components/custom-button/custom-button";
import CustomInput from "#components/custom-input/custom-input";
import FileInput from "#components/file-input/file-input";
import { BiCheck } from "react-icons/bi";
import RoomCard from "#components/room-card/room-card";
import { roomDetail } from "#data/room.data";
import { RiCheckboxBlankCircleLine, RiErrorWarningFill } from "react-icons/ri";
import { FaCircleCheck } from "react-icons/fa6";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchProperty } from "#api/properties.req";
import { fetchGuestUsers } from "#api/user.req";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "../../components/phone-input/phone-input";
import { useFilter } from "#hooks/use-filter";
import { initiateTransaction } from "#api/transaction.req";
import dayjs from "dayjs";
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/svg+xml",
];

const checkoutSchema = z.object({
  firstName: z.string().nonempty({ message: "First Name is Required" }),
  lastName: z.string(),
  // phone: z.string().nonempty({ message: "Phone is Required" }),
  email: z.string().email({ message: "Invalid Email" }),
  file: z
    .any()
    .refine((file) => file?.[0], "ID Proof Required.")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp, .svg formats are supported."
    )
    .refine((file) => file?.[0]?.size <= 50_00_000, `Max image size is 5MB.`),
});

function CheckoutPage({ currentUser }) {
  // console.log({ currentUser });

  const [searchParams, setSearchParams] = useSearchParams();
  const checkInDate = searchParams.get("checkIn");
  const checkOutDate = searchParams.get("checkOut");
  const noOfRooms = searchParams.get("noOfRooms");
  const noOfAdults = searchParams.get("noOfAdults");

  const [sendDeals, setSendDeals] = useState(false);
  const [doYouSmoke, setDoYouSmoke] = useState(false);
  const [phone, setPhone] = useState(
    currentUser?.countryCode + currentUser?.phone || ""
  );
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: currentUser?.email || "",
      firstName: currentUser?.fName || "",
      lastName: currentUser?.lName || "",
    },
    resolver: zodResolver(checkoutSchema),
  });
  console.log({ errors });

  const file = watch("file");

  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(true);
  const [showSelectPartner, setShowSelectPartner] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [bedsSelector, setBedsSelector] = useState(false);
  const [selectedGuests, setSelectedGuests] = useState([]);
  let {
    state: { property, totalPrice, priceBeforeDiscount, pkgDetails },
  } = useLocation();

  let transactionAmount = 0;
  let transactionAmuontBeforeDiscount = 0;

  if (!property || !totalPrice || !priceBeforeDiscount || !pkgDetails)
    navigate(-1);

  if (checkInDate === checkOutDate) {
    transactionAmount = totalPrice;
    transactionAmuontBeforeDiscount = priceBeforeDiscount;
  } else {
    let stayLength = dayjs(checkOutDate).diff(dayjs(checkInDate), "day") + 1;
    transactionAmount = totalPrice * stayLength;
    transactionAmuontBeforeDiscount = priceBeforeDiscount * stayLength;
  }
  const newPkgDetails = {};
  newPkgDetails.rooms = { ...pkgDetails };
  newPkgDetails.noOfAdults = noOfAdults;
  newPkgDetails.noOfRooms = noOfRooms;
  newPkgDetails.amount = transactionAmuontBeforeDiscount;
  newPkgDetails.discountedAmount = transactionAmount;

  const guestQuery = useQuery({
    queryKey: ["user", "guests"],
    queryFn: async () => {
      const guestsResponse = await fetchGuestUsers();
      // console.log({ guestsResponse });
      return guestsResponse?.data;
    },
  });
  const transactionMutation = useMutation({
    mutationFn: async (formData) => {
      const requestData = {
        firstName: formData?.firstName,
        lastName: formData?.lastName,
        email: formData?.email,
        file: formData?.file?.[0],
        specialRequests: formData?.specialRequests,
        discountedAmount: transactionAmount,
        amount: transactionAmuontBeforeDiscount,
        phone: phone?.split(" ")?.[1],
        countryCode: phone?.split(" ")?.[0],
        propertyId: property._id,
        checkInDate,
        checkOutDate,
        guestList: selectedGuests,
        pkgDetails: newPkgDetails,
      };
      const response = await initiateTransaction(requestData);
      console.log({ response });
      const transaction = response?.data?.transaction;
      if (transaction) {
        // $amount = $_GET["amount"];
        // $transactionId = $_GET["transactionId"];
        // $email = $_GET["email"];
        // $phone = $_GET["phone"];
        // $name = $_GET["name"];
        open(
          `${
            import.meta.env.VITE_SITE_URL
          }/cmi/1.PaymentRequest.php?amount=${totalPrice}&transactionId=${
            transaction._id
          }&email=${transaction.email}&phone=${phone}&name=${
            transaction.firstName + " " + transaction?.lastName
          }`,
          "_blank"
        );
      }

      return response?.data;
    },
    onSuccess: (data) => {
      console.log({ data });
    },
    onError: (err) => {
      console.log({ err });
    },
  });

  const guests = guestQuery?.data?.guests;
  // console.log({ guests });

  return (
    <form
      className={styles.checkoutPage}
      onSubmit={handleSubmit(transactionMutation.mutate)}
    >
      {showNotification && (
        <div className={styles.notification}>
          <div className={styles.message}>
            <div className={styles.head}>
              <img src="/images/icons/calendar-remove.svg" alt="" />
              <h3>Non-Refundable Rate</h3>
            </div>
            <p>
              <Balancer>
                If you change or cancel your booking you will not get a refund
                or credit to use for a future stay. This policy will apply
                regardless of COVID-19, subject to any local consumer laws.
              </Balancer>
            </p>
            <img
              onClick={() => setShowNotification(false)}
              className={styles.close}
              src="/images/icons/cross.svg"
              alt=""
            />
          </div>
          <div className={styles.notificationFooter}>
            <div className={styles.logoContainer}>
              <img className={styles.logo} src="/images/logos/loger-logo.png" />
              <p>www.loger.ma.com</p>
            </div>
            <div className={styles.iconLink}>
              <p>Hotel Policies</p>
              <HiOutlineChevronRight className={styles.icon} />
            </div>
          </div>
        </div>
      )}
      <div className={styles.coloredContainer}>
        <div className={styles.contentContainer}>
          <h1 className={styles.title}>
            <Balancer>Complete Your Booking</Balancer>
          </h1>
          <p className={styles.subtitle}>
            <Balancer>
              Welcome to Tirath View, Haridwar - A Four Star Luxury
            </Balancer>
          </p>
        </div>
      </div>
      <div className={styles.container}>
        <div className={`${styles.contentContainer} ${styles.bookingGrid}`}>
          <div className={styles.innerContainer}>
            <div>
              <h2>
                <Balancer>Step 1 - Your Details</Balancer>
              </h2>
              <p>
                <Balancer>
                  Please tell us the name of the guest staying at the hotel as
                  it appears on the ID that they'll present at check-in. If the
                  guest has more than one last name, please enter them all.
                </Balancer>
              </p>
            </div>
            <div className={styles.formContainer}>
              <div className={styles.head}>
                <p>
                  <Balancer>
                    Please give us the name of one of the people staying in this
                    room.
                  </Balancer>
                </p>
                <MultiSelect
                  label="Your Travel Partners ?"
                  isVisible={showSelectPartner}
                  setVisibility={setShowSelectPartner}
                  items={(guests || []).map((guest) => ({
                    label: guest.name,
                    value: guest._id,
                  }))}
                  selectedItems={selectedGuests}
                  setItems={setSelectedGuests}
                />
              </div>
              <div className={styles.inputsContainer}>
                <div className={styles.inputContainer}>
                  <CustomInput
                    secondary
                    label="First Name"
                    bold
                    placeholder="First Name"
                    register={{ ...register("firstName") }}
                    error={errors?.firstName?.message}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <CustomInput
                    secondary
                    label="Last Name"
                    bold
                    placeholder="Last Name"
                    register={{ ...register("lastName") }}
                    error={errors?.lastName?.message}
                  />
                </div>
                <div className={styles.inputContainer}>
                  {/* <CustomInput
                    secondary
                    label="Phone"
                    bold
                    placeholder="Phone"
                    register={{ ...register("phone") }}
                  /> */}
                  <PhoneInput
                    phone={phone}
                    setPhone={setPhone}
                    label="Phone"
                    secondary
                  />
                </div>
                <div className={styles.inputContainer}>
                  <CustomInput
                    secondary
                    label="Email"
                    bold
                    placeholder="Email"
                    register={{ ...register("email") }}
                    error={errors?.email?.message}
                  />
                </div>

                <div className={styles.inputContainer}>
                  <FileInput
                    label={"Any ID Proof"}
                    file={file}
                    placeholder="Attach Any ID Proof"
                    register={{ ...register("file") }}
                    error={errors?.file?.message}
                  />
                </div>
              </div>
              <div className={styles.subscribeSection}>
                {/* <div
                  className={styles.checkboxContainer}
                  onClick={() => setSubscribed((prevState) => !prevState)}
                >
                  <div
                    className={`${styles.checkbox} ${
                      subscribed ? styles.checked : ""
                    }`}
                    role="checkbox"
                    aria-checked={subscribed}
                  >
                    <BiCheck className={`${styles.icon}`} />
                  </div>
                  <label>
                    Please email me great deals, last-minute offers and
                    information about properties
                  </label>
                </div> */}
                <div style={{ color: "black" }}>
                  <CustomCheckbox
                    label=" Please email me great deals, last-minute offers and
                    information about properties"
                    leftSided
                    checked={sendDeals}
                    setChecked={() => setSendDeals((prevState) => !prevState)}
                    style={{ width: "fit-content" }}
                  />
                </div>
                <h3>
                  <Balancer>Any Special Requests ?</Balancer>
                </h3>
                <p>
                  <Balancer>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </Balancer>
                </p>
                <textarea
                  placeholder="Write Something Special"
                  {...register("specialRequests")}
                ></textarea>
              </div>
            </div>
            <div>
              <h2>
                <Balancer>Step 2 - Property Details</Balancer>
              </h2>
              <p>
                <Balancer>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took
                </Balancer>
              </p>
            </div>
            <div className={styles.formContainer}>
              <h3>Property highlights</h3>
              <div className={styles.features}>
                <div className={styles.feature}>
                  <img src="/images/highlight-icons/bed.svg" alt="beds" />
                  <p>Luxury Bed</p>
                </div>
                <div className={styles.feature}>
                  <img src="/images/highlight-icons/ice.svg" alt="" />
                  <p>Air Conditioner</p>
                </div>
                <div className={styles.feature}>
                  <img src="/images/highlight-icons/towel.svg" alt="" />
                  <p>Laundry</p>
                </div>
                <div className={styles.feature}>
                  <img
                    src="/images/highlight-icons/parking.svg"
                    alt="parking"
                  />
                  <p>Free Parking</p>
                </div>
                <div className={styles.feature}>
                  <img src="/images/room-icons/meal.svg" alt="meal" />
                  <p>Breakfast/Lunch/Dinner</p>
                </div>
              </div>
              <div className={styles.included}>
                <h3>Included in Your Room</h3>
                <div
                  className={`${styles.coloredContainer} ${styles.features}`}
                >
                  <div className={styles.feature}>
                    <img src="/images/icons/breakfast-colored.svg" alt="" />
                    <p>Breakfast Full Family</p>
                  </div>
                  <div className={styles.feature}>
                    <img src="/images/icons/smoking.svg" alt="" />
                    <p>Smoking Zone</p>
                  </div>
                </div>
                <h3>Preferences</h3>
                <p>Please note that room preferences cannot be guaranteed.</p>
                <div className={styles.preference}>
                  {/* <MultiSelect
                    flexible
                    label="1 Queen Bed"
                    items={["King Bed"]}
                    isVisible={bedsSelector}
                    setVisibility={setBedsSelector}
                  /> */}
                  <div className={styles.checkboxContainer}>
                    <CustomCheckbox
                      label="Do You Smoke?"
                      checked={doYouSmoke}
                      setChecked={() =>
                        setDoYouSmoke((prevState) => !prevState)
                      }
                      leftSided
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.roomContainer}>
            <RoomCard
              room={{
                ...roomDetail,
                photos: property?.photos,
                roomName: property?.propertyName,
                capacity: newPkgDetails?.noOfAdults,
              }}
              bookingDetails={{
                checkInDate,
                checkOutDate,
              }}
              property={property}
              pkgDetails={newPkgDetails}
            />
          </div>
        </div>
      </div>
      <div className={styles.protectBooking}>
        <div className={styles.contentContainer}>
          <div className={styles.head}>
            <h3>Protect Your Booking</h3>
            <p>Recommended</p>
          </div>
          <div className={styles.description}>
            <Balancer>
              <RiErrorWarningFill className={styles.icon} />
              Important : Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It
              has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions
            </Balancer>
          </div>
        </div>
      </div>
      {/* <div className={styles.checkinoutDetails}>
        <p>
          <span>Check In: </span>Friday, 29/06/2023 (Afternoon)
        </p>
        <p>
          <span>Check Out: </span>Thursday, 04/07/2023 (Afternoon)
        </p>
        <div className={styles.timings}>
          <p>
            <span>Arrive Time</span>
          </p>
        </div>
      </div> */}
      <div className={styles.container}>
        <div className={`${styles.contentContainer}`}>
          <h2>Cancellation Policies</h2>
          <h4>Double Bed Room</h4>
          <div className={styles.cancellation}>
            <div className={styles.head}>
              <h4>Fully Refundable Until 15/07/2023</h4>
              <MdOutlineKeyboardArrowDown className={styles.icon} />
            </div>
            <div className={styles.progress}>
              <div className={styles.stage}>
                <div className={`${styles.status} ${styles.filled}`}>
                  <FaCircleCheck
                    className={`${styles.iconFilled} ${styles.icon}`}
                  />
                </div>
                <p>Cancel for free from now until 6:00 PM, 12/07/2023</p>
              </div>
              <div className={styles.stage}>
                <div className={`${styles.status}`}>
                  <RiCheckboxBlankCircleLine className={styles.icon} />
                </div>
                <p>
                  If you change or cancel this booking after 6:00 PM, 12/07/2023
                  property's local time (Bangladesh Standard Time), you'll be
                  charged for 1 night (including tax).
                </p>
                <div className={styles.path}></div>
              </div>
              <div className={styles.stage}>
                <div className={`${styles.status}`}>
                  <RiCheckboxBlankCircleLine className={styles.icon} />
                </div>
                <p>Check-in 14/07/2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <CustomButton
            fit
            // onClick={() => navigate("/booking-details")}
          >
            Confirm Booking
          </CustomButton>
          <div className={styles.tNc}>
            <img src="/images/icons/lock.svg" alt="lock" />
            <p>
              <Balancer>
                We Use Secure Transmission & Encrypted Storage to Protect Your
                Personal Information.
                <span className={styles.link}>Terms & Condition</span>
              </Balancer>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}

export function MultiSelect({
  label,
  items,
  isVisible,
  setVisibility,
  flexible,
  selectedItems,
  setItems,
}) {
  const ref = useRef(null);

  useEffect(() => {
    function handleOutsideClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setVisibility(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref.current]);
  return (
    <div
      className={`${styles.multiSelect} ${flexible ? styles.flexible : ""}`}
      ref={ref}
    >
      <div
        className={styles.label}
        onClick={() => setVisibility((prevState) => !prevState)}
      >
        <p>{label}</p>
        <MdOutlineKeyboardArrowDown
          className={`${styles.icon} ${isVisible ? styles.visible : ""}`}
        />
      </div>
      {isVisible && (
        <div className={styles.optionsContainer}>
          <div className={styles.options}>
            {items?.map((item, i) => (
              <CustomCheckbox
                checked={selectedItems.includes(item.value)}
                setChecked={() => {
                  if (selectedItems.includes(item.value)) {
                    setItems((prevState) =>
                      prevState.filter((guest) => guest !== item.value)
                    );
                  } else {
                    setItems((prevState) => [...prevState, item.value]);
                  }
                }}
                label={item.label}
                key={i}
              />
            ))}
          </div>
          <CustomButton onClick={() => setVisibility(false)}>Save</CustomButton>
        </div>
      )}
    </div>
  );
}
const mapState = ({ user: { currentUser } }) => ({
  currentUser,
});
export default connect(mapState)(CheckoutPage);
