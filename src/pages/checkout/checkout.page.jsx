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
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(true);
  const [showSelectPartner, setShowSelectPartner] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [bedsSelector, setBedsSelector] = useState(false);
  return (
    <div className={styles.checkoutPage}>
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
                  items={[
                    "Mr. John Doe",
                    "Mr. Ammar Doe",
                    "Mr. Khaled Doe",
                    "Mr. John Doe",
                    "Mr. Ammar Doe",
                    "Mr. Khaled Doe",
                  ]}
                />
              </div>
              <div className={styles.inputsContainer}>
                <div className={styles.inputContainer}>
                  <CustomInput
                    secondary
                    label="First Name"
                    bold
                    placeholder="First Name"
                  />
                </div>
                <div className={styles.inputContainer}>
                  <CustomInput
                    secondary
                    label="Last Name"
                    bold
                    placeholder="Last Name"
                  />
                </div>
                <div className={styles.inputContainer}>
                  <CustomInput
                    secondary
                    label="Phone"
                    bold
                    placeholder="Phone"
                  />
                </div>
                <div className={styles.inputContainer}>
                  <CustomInput
                    secondary
                    label="Email"
                    bold
                    placeholder="Email"
                  />
                </div>

                <div className={styles.inputContainer}>
                  <FileInput
                    label="Any ID Proof"
                    placeholder="Attach Any ID Proof"
                  />
                </div>
              </div>
              <div className={styles.subscribeSection}>
                <div
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
                <textarea placeholder="Write Something Special"></textarea>
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
                  <MultiSelect
                    flexible
                    label="1 Queen Bed"
                    items={["King Bed"]}
                    isVisible={bedsSelector}
                    setVisibility={setBedsSelector}
                  />
                  <div className={styles.checkboxContainer}>
                    <CustomCheckbox label="Do You Smoke ?" leftSided />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.roomContainer}>
            <RoomCard room={roomDetail} booking />
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
          <CustomButton fit onClick={() => navigate("/booking-details")}>
            Reserve Room
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
    </div>
  );
}

export function MultiSelect({
  label,
  items,
  isVisible,
  setVisibility,
  flexible,
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
              <CustomCheckbox label={item} key={i} />
            ))}
          </div>
          <CustomButton onClick={() => setVisibility(false)}>Save</CustomButton>
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;
