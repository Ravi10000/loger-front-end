import styles from "./checkout.page.module.scss";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
import { connect } from "react-redux";
// import z from "zod";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { Balancer } from "react-wrap-balancer";

import { HiOutlineChevronRight } from "react-icons/hi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { FaCircleCheck } from "react-icons/fa6";

import { useProperty } from "#hooks/property-info";

import CustomCheckbox from "#components/custom-checkbox/custom-checkbox";
import CustomButton from "#components/custom-button/custom-button";
// import CustomInput from "#components/custom-input/custom-input";
// import FileInput from "#components/file-input/file-input";
import RoomCard from "#components/room-card/room-card";
// import PhoneInput from "../../components/phone-input/phone-input";

import { fetchGuestUsers } from "#api/user.req";
import { initiateTransaction } from "#api/transaction.req";

import { decrypt } from "#utils/secure-url.utils";

// import { roomDetail } from "#data/room.data";
import LoadingPage from "#pages/loading/loading";
import GuestInfo from "#components/guest-info/guest-info";
import { pushFlash } from "#redux/flash/flash.actions";
import CustomCarousel from "#components/custom-carousel/custom-carousel";
import api from "#api/index";

// const ACCEPTED_IMAGE_TYPES = [
//   "image/jpeg",
//   "image/jpg",
//   "image/png",
//   "image/webp",
// ];

// const checkoutSchema = z.object({
//   firstName: z.string().nonempty({ message: "First Name is Req  uired" }),
//   lastName: z.string(),
//   email: z.string().email({ message: "Invalid Email" }),
//   file: z
//     .any()
//     .refine((file) => file?.[0], "ID Proof Required.")
//     .refine(
//       (file) => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type),
//       "Only .jpg, .jpeg, .png and .webp formats are supported."
//     )
//     .refine((file) => file?.[0]?.size <= 50_00_000, `Max image size is 5MB.`),
// });

ConnectedCheckoutPage.propTypes = {
  currentUser: PropTypes.object,
  isFetching: PropTypes.bool,
  pushFlash: PropTypes.func,
};

function ConnectedCheckoutPage({ currentUser, isFetching, pushFlash }) {
  // const navigate = useNavigate();

  const { propertyId } = useParams();
  const [searchParams] = useSearchParams();

  const [guestInfo, setGuestInfo] = useState([
    { firstName: "", lastName: "", email: "", phone: "", file: "" },
  ]);

  const [carouselImages, setCarouselImages] = useState(null);
  const handleGuestInfoChange = ({ key, value, idx }) => {
    setGuestInfo((ps) => {
      const newGuestInfo = [...ps];
      newGuestInfo[idx][key] = value;
      return newGuestInfo;
    });
  };
  const removeGuestInfo = (idx) => {
    const guestToRemove = guestInfo[idx];
    setGuestInfo((ps) => {
      const newPs = [...ps];
      newPs.splice(idx, 1);
      return newPs;
    });
    if (guestToRemove?._id) {
      setSelectedGuests((ps) => {
        const tempList = [...ps];
        return tempList.filter((guest) => guest !== guestToRemove._id);
      });
    }
  };

  const checkInDate = searchParams.get("checkIn");
  const checkOutDate = searchParams.get("checkOut");

  const noOfAdults = searchParams.get("noOfAdults");
  const state = decrypt(searchParams.get("state"));
  console.log({ state });

  let { totalPrice, priceBeforeDiscount, pkgDetails } = state;
  const noOfRooms = Object.keys(pkgDetails)?.reduce(
    (acc, key) => acc + pkgDetails[key].count,
    0
  );
  // console.log({ pkgDetails });

  const [sendDeals, setSendDeals] = useState(false);
  const [doYouSmoke, setDoYouSmoke] = useState(false);
  const [specialRequests, setSpecialRequests] = useState("");

  // const [phone, setPhone] = useState(
  //   currentUser?.countryCode + currentUser?.phone || ""
  // );
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm({
  //   defaultValues: {
  //     email: currentUser?.email || "",
  //     firstName: currentUser?.fName || "",
  //     lastName: currentUser?.lName || "",
  //   },
  //   resolver: zodResolver(checkoutSchema),
  // });

  // const file = watch("file");

  const [showNotification, setShowNotification] = useState(true);
  const [showSelectPartner, setShowSelectPartner] = useState(false);
  const [selectedGuests, setSelectedGuests] = useState([]);

  let transactionAmount = 0;
  let transactionAmuontBeforeDiscount = 0;

  if (checkInDate === checkOutDate) {
    transactionAmount = totalPrice;
    transactionAmuontBeforeDiscount = priceBeforeDiscount;
  } else {
    let stayLength = dayjs(checkOutDate).diff(dayjs(checkInDate), "day") + 1;
    transactionAmount = totalPrice * stayLength;
    transactionAmuontBeforeDiscount = priceBeforeDiscount * stayLength;
  }
  const newPkgDetails = {};
  if (pkgDetails) {
    newPkgDetails.rooms = { ...pkgDetails };
    newPkgDetails.noOfAdults = noOfAdults;
    newPkgDetails.noOfRooms = noOfRooms;
    newPkgDetails.amount = transactionAmuontBeforeDiscount;
    newPkgDetails.discountedAmount = transactionAmount;
  }

  const guestQuery = useQuery({
    queryKey: ["user", "guests"],
    enabled: !!currentUser,
    queryFn: async () => {
      const guestsResponse = await fetchGuestUsers();
      return guestsResponse?.data;
    },
  });
  const { property } = useProperty(
    propertyId,
    ["propertyName", "photos", "facilities"],
    ["facilities"]
  );
  const transactionMutation = useMutation({
    mutationFn: async () => {
      const guestIds = [];
      const guestErrors = [];
      guestInfo?.forEach((guest) => {
        const errors = {};
        if (!guest?.firstName) {
          errors.firstName = "First Name is required";
        } else {
          delete errors.firstName;
        }

        if (!guest?.phone) {
          errors.phone = "Phone is required";
        } else if (guest?.phone?.length < 10) {
          errors.phone = "Phone is required";
        } else {
          delete errors.phone;
        }
        if (!guest?.email) {
          errors.phone = "Email is required";
        } else {
          delete errors.email;
        }
        if (!guest.idProof && !guest.file)
          errors.idProof = "ID Proof is required";
        if (guest?.file && !guest?.file?.type?.includes?.("image")) {
          errors.idProof = "Only Images are supported";
        }
        if (guest?.file && guest?.file?.type?.includes?.("image")) {
          delete errors.idProof;
        }
        const allErros = Object.keys(errors);
        if (allErros?.length) guestErrors.push(errors);
      });
      if (guestErrors?.length) {
        setGuestInfo((guestInfo) => {
          const newGuestInfo = [...guestInfo];
          newGuestInfo.forEach((guest, idx) => {
            guest.errors = guestErrors[idx];
          });
          return newGuestInfo;
        });
        pushFlash({
          message: "Please Review Guest Details and Fill Required Fields",
          type: "error",
        });
        return;
      }
      const [user, ...otherGuests] = guestInfo;
      if (otherGuests?.length) {
        await Promise.all(
          otherGuests?.map?.(async (guest) => {
            const { firstName, lastName, email, phone, file, _id } = guest;
            const formData = new FormData();
            formData.append("firstName", firstName);
            formData.append("lastName", lastName);
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("idProof", file);
            if (_id) {
              formData.append("guestId", _id);
              const { data } = await api.putForm("/user/guest", formData);
              guestIds.push(data?.guest?._id);
            } else {
              const { data } = await api.postForm("/user/guest", formData);
              guestIds.push(data?.guest?._id);
            }
          })
        );
      }
      const { firstName, lastName, email, phone, file, idProof } = user || {};
      if (!firstName || !lastName || !email || !phone) {
        pushFlash({ message: "Please Enter Your Details", type: "error" });
        return;
      } else if (!file && !idProof) {
        pushFlash({ message: "Please Upload Your ID Proof", type: "error" });
        return;
      }
      console.log({ idProof: file });
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone?.split(" ")?.[1]);
      formData.append("countryCode", phone?.split(" ")?.[0]);
      formData.append("discountedAmount", transactionAmount);
      formData.append("amount", transactionAmuontBeforeDiscount);
      formData.append("propertyId", property._id);
      formData.append("checkInDate", checkInDate);
      formData.append("checkOutDate", checkOutDate);
      if (guestIds?.length)
        guestIds.forEach((guestId) => {
          formData.append("guestList[]", guestId);
        });

      if (file?.name) formData.append("idProof", file);

      if (specialRequests) formData.append("specialRequests", specialRequests);

      const pkgDetails = newPkgDetails?.rooms
        ? newPkgDetails
        : {
            price: priceBeforeDiscount,
            discountedAmount: totalPrice,
            occupancy: noOfAdults,
          };

      formData.append("pkgDetails", JSON.stringify(pkgDetails));
      const requestData = {
        firstName,
        lastName,
        email,
        ...(idProof && { idProof: file }),
        ...(specialRequests && { specialRequests }),
        discountedAmount: transactionAmount,
        amount: transactionAmuontBeforeDiscount,
        phone: phone?.split(" ")?.[1],
        countryCode: phone?.split(" ")?.[0],
        propertyId: property._id,
        checkInDate,
        checkOutDate,
        ...(!!guestIds?.length && { guestList: guestIds }),
        pkgDetails: newPkgDetails?.rooms
          ? newPkgDetails
          : {
              price: priceBeforeDiscount,
              discountedAmount: totalPrice,
              occupancy: noOfAdults,
            },
      };
      const transactionResponse = await initiateTransaction(formData);
      console.log({ transactionResponse });
      const transaction = transactionResponse?.data?.transaction;
      if (transaction) {
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

      return transactionResponse?.data;
    },
    onSuccess: (data) => {
      console.log({ data });
    },
    onError: (err) => {
      pushFlash({
        message: `Something went wrong😢,
            🙏please refresh the page and try again.`,
        type: "error",
      });
      console.log({ err });
    },
  });

  const guests = guestQuery?.data?.guests;

  useEffect(() => {
    if (!isFetching && currentUser) {
      // (ps) => {
      //   const newPs = [...ps];
      //   newPs[0].firstName = currentUser?.fName || "";
      //   newPs[0].lastName = currentUser?.lName || "";
      //   newPs[0].email = currentUser?.email || "";
      //   console.log({
      //     phone: currentUser?.countryCode + " " + currentUser?.phone,
      //   });
      //   newPs[0].phone = currentUser?.countryCode + " " + currentUser?.phone;
      //   console.log({ newPs });
      //   return newPs;
      // }
      setGuestInfo([
        {
          firstName: currentUser?.fName || "",
          lastName: currentUser?.lName || "",
          email: currentUser?.email || "",
          phone: currentUser?.countryCode + " " + currentUser?.phone,
          idProof: currentUser?.idProof || "",
        },
      ]);
    }
  }, [isFetching, currentUser]);
  console.log({ guestInfo });

  return isFetching ? (
    <LoadingPage />
  ) : (
    <div className={styles.checkoutPage}>
      {carouselImages && (
        <CustomCarousel
          images={carouselImages}
          close={() => {
            setCarouselImages(null);
          }}
        />
      )}
      {showNotification && (
        <div className={styles.notification}>
          <div className={styles.message}>
            <div className={styles.head}>
              <img src="/images/icons/calendar-remove.svg" alt="calendar" />
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
              alt="close"
            />
          </div>
          <div className={styles.notificationFooter}>
            <div className={styles.logoContainer}>
              <img
                className={styles.logo}
                src="/images/logos/loger-logo.png"
                alt="loger.ma"
              />
              {/* <p>loger.ma</p> */}
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
            <Balancer>Welcome to {property?.propertyName}</Balancer>
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
                  it appears on the ID that they&apos;ll present at check-in.
                </Balancer>
              </p>
            </div>
            <div className={styles.formContainer}>
              <div className={styles.head}>
                <p>
                  <Balancer>
                    Please give us the details of the people who will stay here.
                  </Balancer>
                </p>
                {guestQuery?.isLoading ? (
                  <p>loading...</p>
                ) : (
                  <MultiSelect
                    label="Your Travel Partners ?"
                    isVisible={showSelectPartner}
                    setVisibility={setShowSelectPartner}
                    items={(guests || []).map((guest) => ({
                      label: `${guest?.firstName ? guest.firstName : ""}  ${
                        guest?.lastName ? guest.lastName : ""
                      }`,
                      value: guest._id,
                    }))}
                    addToList={(idx) => {
                      setGuestInfo((ps) => [...ps, guests[idx]]);
                    }}
                    removeFromList={(id) => {
                      setGuestInfo((ps) => {
                        const idx = ps.findIndex((guest) => guest?._id === id);
                        if (idx >= 0) {
                          const newPs = [...ps];
                          newPs.splice(idx, 1);
                          return newPs;
                        }
                      });
                    }}
                    selectedItems={selectedGuests}
                    setItems={setSelectedGuests}
                  />
                )}
              </div>
              {!isFetching &&
                guestInfo?.map((guest, idx) => (
                  <GuestInfo
                    info={guest}
                    idx={idx}
                    key={idx}
                    setGuestInfo={({ key, value }) => {
                      handleGuestInfoChange({ key, value, idx });
                    }}
                    removeGuestInfo={() => removeGuestInfo(idx)}
                  />
                ))}
              <CustomButton
                fit
                onClick={() => {
                  setGuestInfo((ps) => [
                    ...ps,
                    { firstName: "", lastName: "", email: "", phone: "" },
                  ]);
                }}
              >
                Add Guest
              </CustomButton>
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
                    typesetting industry. Lorem Ipsum has been the
                    industry&apos;s standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled
                    it to make a type specimen book.
                  </Balancer>
                </p>
                <textarea
                  placeholder="Write Something Special"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  // {...register("specialRequests")}
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
                  typesetting industry. Lorem Ipsum has been the industry&apos;s
                  standard dummy text ever since the 1500s, when an unknown
                  printer took
                </Balancer>
              </p>
            </div>
            <div className={styles.formContainer}>
              <h3>Property highlights</h3>
              <div className={styles.features}>
                {property?.facilities?.map?.((facility) => (
                  <div className={styles.feature} key={facility?._id}>
                    <img
                      src={`${import.meta.env.VITE_SERVER_URL}/images/${
                        facility?.image
                      }`}
                      alt={facility?.name}
                    />
                    <p>{facility?.name}</p>
                  </div>
                ))}
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
          {property && (
            <div className={styles.roomContainer}>
              <RoomCard
                setCarouselImages={setCarouselImages}
                room={{
                  // ...roomDetail,
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
          )}
        </div>
      </div>

      <div className={styles.container}>
        <div className={`${styles.contentContainer}`}>
          <h2>Cancellation Policies</h2>
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
                  property&apos;s local time (Bangladesh Standard Time),
                  you&apos;ll be charged for 1 night (including tax).
                </p>
                <div className={styles.path}></div>
              </div>
              <div className={styles.stage}>
                <div className={`${styles.status}`}>
                  <RiCheckboxBlankCircleLine className={styles.icon} />
                </div>
                <p>Check-in {dayjs(checkInDate).format("DD-MM-YYYY")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <CustomButton fit onClick={transactionMutation.mutate}>
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
    </div>
  );
}

MultiSelect.propTypes = {
  label: PropTypes.string,
  items: PropTypes.array,
  isVisible: PropTypes.bool,
  setVisibility: PropTypes.func,
  flexible: PropTypes.bool,
  selectedItems: PropTypes.array,
  setItems: PropTypes.func,
  addToList: PropTypes.func,
  removeFromList: PropTypes.func,
  emptyMsg: PropTypes.string,
};
function MultiSelect({
  label,
  items,
  isVisible,
  setVisibility,
  flexible,
  selectedItems,
  setItems,
  addToList,
  removeFromList,
  emptyMsg = "Your Added guests will appear here.",
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
  }, [ref, setVisibility]);

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
          {!items?.length ? (
            <p>{emptyMsg}</p>
          ) : (
            <>
              <div className={styles.options}>
                {items?.map((item, i) => (
                  <CustomCheckbox
                    checked={selectedItems.includes(item.value)}
                    setChecked={() => {
                      if (selectedItems.includes(item.value)) {
                        removeFromList(item.value);
                        setItems((prevState) =>
                          prevState.filter((guest) => guest !== item.value)
                        );
                      } else {
                        addToList(i);
                        setItems((prevState) => [...prevState, item.value]);
                      }
                    }}
                    label={item.label}
                    key={i}
                  />
                ))}
              </div>
              <CustomButton onClick={() => setVisibility(false)}>
                Save
              </CustomButton>
            </>
          )}
        </div>
      )}
    </div>
  );
}
const mapState = ({ user: { currentUser, isFetching } }) => ({
  currentUser,
  isFetching,
});

const CheckoutPage = connect(mapState, { pushFlash })(ConnectedCheckoutPage);
export default CheckoutPage;
