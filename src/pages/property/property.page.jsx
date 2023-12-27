import styles from "./property.page.module.scss";

import { Fragment, useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { Balancer } from "react-wrap-balancer";

import { PiArrowLeftBold } from "react-icons/pi";
import { GoShareAndroid } from "react-icons/go";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { HiOutlineChevronRight } from "react-icons/hi";
import { FaLocationDot } from "react-icons/fa6";

import CustomButton from "#components/custom-button/custom-button";
import Search from "#components/search/search";
import RoomCard from "#components/room-card/room-card";
import Reviews from "#components/reviews/reviews";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProperty } from "#api/properties.req";
import { connect } from "react-redux";
import { useAuthWindow } from "#contexts/auth-window.context";
import { addToWishlist, removeFromWishlist } from "#api/wishlist.req";
import { currencyFormator } from "#utils/currency-formator";
import { pushFlash } from "#redux/flash/flash.actions";
import CustomCarousel from "#components/custom-carousel/custom-carousel";
import PropTypes from "prop-types";
import { decrypt, encrypt } from "#utils/secure-url.utils";
import { Link as ScrollLink } from "react-scroll";
import { extractPhotUrls, reorderPhotos } from "#utils/photos.util";
const gridFooterOptions = [
  {
    name: "Overview",
    target: "overview",
  },
  { name: "Description", target: "description" },
  { name: "Facilities & Amenities", target: "facilities" },
  { name: "Location", target: "location" },
  { name: "Reviews", target: "reviews" },
];

ConnectedPropertyPage.propTypes = {
  currentUser: PropTypes.object,
  pushFlash: PropTypes.func,
};

function getAmenitiesNFamilityFacilities(property) {
  if (!property?._id) return {};
  const content =
    property?.propertyType === "apartment"
      ? property?.apartment
      : property?.hotel;

  const amenities = [];
  amenities.push(
    property?.breakfastServed ? "Breakfast Served" : "Breakfast Unavailable"
  );

  if (property?.breakfastServed)
    amenities.push(
      property?.breakfastIncluded
        ? "Breakfast Included"
        : `Breakfast Charges ${property?.breakfastPrice} Per Person`
    );
  amenities.push(
    property?.parkingAvailable ? "Parking Available" : "Parking Unavailable"
  );

  if (property?.parkingAvailable) {
    amenities.push(
      property?.parkingReservation
        ? "Parking Reservation Required"
        : `No Parking Reservation Required`
    );
  }

  amenities.push(
    content?.smokingAllowed ? "Smoking Allowed" : "Smoking Not Allowed"
  );
  amenities.push(content?.petsAllowed ? "Pets Allowed" : "Pets Not Allowed");
  amenities.push(
    content?.partiesEventsAllowed
      ? "Parties & Events Allowed"
      : "Parties & Events Not Allowed"
  );

  const familyOptions = [];
  familyOptions.push(
    content?.childrenAllowed ? "Children Allowed" : "Children Not Allowed"
  );
  familyOptions.push(
    content?.cribOffered ? "Crib Offered" : "Crib Not Offered"
  );

  return { amenities, familyOptions };
}

function ConnectedPropertyPage({ currentUser, pushFlash }) {
  const { openAuthWindow } = useAuthWindow();
  const [carouselImages, setCarouselImages] = useState(null);
  const [searchParams] = useSearchParams();
  const noOfAdults = searchParams.get("noOfAdults");
  const { pathname } = useLocation();
  let pkg = searchParams.get("pkg");
  pkg = pkg?.length && decrypt(pkg);

  const currentUrlParams = searchParams.toString();
  const { propertyId } = useParams();

  const [totalPrice, setTotalPrice] = useState(0);
  const [priceBeforeDiscount, setPriceBeforeDiscount] = useState(0);
  const [pkgDetails, setPkgDetails] = useState(() => {
    const details = {};
    pkg?.rooms?.forEach((room) => {
      if (details?.[room.name]) details[room.name].count += 1;
      else
        details[room.name] = {
          count: 1,
          discountedPrice: parseFloat(room.discountedPrice),
          price: parseFloat(room.price),
        };
    });
    return details;
  });

  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(gridFooterOptions[0]);

  const propertyQuery = useQuery({
    queryKey: ["property", propertyId],
    enabled: !!propertyId,
    queryFn: async () => {
      try {
        const res = await fetchProperty(propertyId);
        console.log({ res });
        return res?.data || {};
      } catch (err) {
        console.log("error while fetching property");
        console.error({ err: err?.response?.data });
      }
    },
  });

  const { isError, isLoading } = propertyQuery;

  const { property, rooms, isInWishlist } = propertyQuery?.data || {};
  const content =
    property?.propertyType === "apartment"
      ? property?.apartment
      : property?.hotel;

  console.log({ propertyType: property?.propertyType });

  if (property?.propertyType === "hotel" && gridFooterOptions?.length === 5) {
    gridFooterOptions?.splice(4, 0, { name: "Rooms", target: "room-details" });
  }

  const { amenities, familyOptions } =
    getAmenitiesNFamilityFacilities(property);

  useEffect(() => {
    if (property?.propertyType === "apartment")
      content?.prices?.forEach?.((pkg) => {
        if (pkg?.occupancy == noOfAdults) {
          setTotalPrice(pkg?.discountedPrice);
          setPriceBeforeDiscount(pkg?.price);
        }
      });
  }, [noOfAdults, content, property]);
  const client = useQueryClient();

  const wishlistMutation = useMutation({
    mutationFn: async () => {
      let response = {};
      if (currentUser) {
        if (!isInWishlist) response = await addToWishlist(propertyId);
        else {
          response = await removeFromWishlist(propertyId);
        }
      } else {
        openAuthWindow("signin");
      }
      return response;
    },
    onSuccess: (response) => {
      if (response?.data?.status === "success") {
        propertyQuery.refetch();
        client.invalidateQueries("wishlist");
        pushFlash({ type: "success", message: "Wishlist updated" });
      }
    },
  });

  const photos = reorderPhotos(property?.photos || []);
  console.log({ photos });
  const photoUrls = extractPhotUrls(photos);
  console.log({ photosUrls: photoUrls });
  // const mainPhoto = property?.photos?.find((photo) => photo?.isMain);
  // let foundMainPhoto = false;

  useEffect(() => {
    let price = 0;
    let priceBeforeDiscount = 0;
    Object.values(pkgDetails).forEach((room) => {
      if (room.count && room.discountedPrice && room.price) {
        price += room.count * room.discountedPrice;
        priceBeforeDiscount += room.count * room.price;
      }
    });
    setTotalPrice(price);
    setPriceBeforeDiscount(priceBeforeDiscount);
  }, [pkgDetails]);

  return (
    <div className={styles.propertyPage}>
      {carouselImages?.length && (
        <CustomCarousel
          images={carouselImages}
          // images={property?.photos?.map((photo) => photo?.photoUrl)}
          close={() => {
            setCarouselImages(null);
          }}
        />
      )}
      <div className={styles.headContainer}>
        <div className={styles.head}>
          <h2>Choose Date to View Prices</h2>
          <Search />
        </div>
      </div>
      <div className={styles.imageGridContainer} id="overview">
        <div className={styles.actions}>
          <div className={styles.iconLink} onClick={() => navigate(-1)}>
            <PiArrowLeftBold className={`${styles.backIcon} ${styles.icon}`} />
            <p>See all properties</p>
          </div>
          <div className={styles.rightSection}>
            <div className={styles.action}>
              <div className={styles.iconContainer}>
                <GoShareAndroid className={styles.icon} />
              </div>
              <p>Share</p>
            </div>
            <div className={styles.action}>
              <div
                className={styles.iconContainer}
                onClick={wishlistMutation.mutate}
              >
                {isInWishlist ? (
                  <AiFillHeart className={`${styles.icon} ${styles.liked}`} />
                ) : (
                  <AiOutlineHeart className={`${styles.icon}`} />
                )}
              </div>
              <p>Save</p>
            </div>
          </div>
        </div>
        <div
          className={styles.imageGrid}
          onClick={() => {
            if (photoUrls?.length) setCarouselImages(photoUrls);
          }}
        >
          {!isLoading && !isError && (
            <>
              {photoUrls?.map((photo, idx) => {
                if (idx > 6) return <Fragment key={photo}></Fragment>;
                return (
                  <div
                    key={photo}
                    style={{
                      backgroundColor: "lightgray",
                      backgroundImage: `url("${
                        import.meta.env.VITE_SERVER_URL
                      }/images/${photo}")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                );
              })}
              {photoUrls?.length - 8 > 1 ? (
                <div
                  key="rest of the photos"
                  style={{
                    background: `linear-gradient(to bottom, #1c1c1e84, #1c1c1e84),
                    url("${import.meta.env.VITE_SERVER_URL}/images/${
                      photoUrls[8]
                    }")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <h4>+{photoUrls?.length - 8} photos</h4>
                </div>
              ) : (
                <div
                  key="last photo"
                  style={{
                    background: `url("${
                      import.meta.env.VITE_SERVER_URL
                    }/images/${photoUrls?.[photoUrls?.length - 1]}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              )}
            </>
          )}
        </div>
        <div className={styles.gridFooter}>
          <div className={styles.navigation}>
            {gridFooterOptions?.map((option) => (
              <ScrollLink
                smooth={true}
                duration={100}
                to={`${option.target}`}
                onClick={() => {
                  console.log({
                    targetLinkg: `${pathname}?${currentUrlParams}#${option.target}`,
                  });
                  setSelectedOption(option);
                }}
                className={`${styles.option} ${
                  selectedOption.target === option.target ? styles.selected : ""
                } `}
                key={option.target}
              >
                {option.name}
              </ScrollLink>
            ))}
          </div>
          <div className={styles.right}>
            <CustomButton
              customStyles={
                totalPrice ? {} : { opacity: ".5", cursor: "not-allowed" }
              }
              onClick={() => {
                if (!totalPrice) return;
                if (!currentUser) {
                  openAuthWindow("signin");
                  return;
                }
                console.log({ currentUrlParams });
                const newparams = new URLSearchParams(currentUrlParams);
                newparams.delete("pkg");
                newparams.append(
                  "state",
                  encrypt({
                    pkgDetails,
                    totalPrice,
                    priceBeforeDiscount,
                    // property,
                  })
                );
                console.log({ newparams: newparams.toString() });
                navigate(`/checkout/${propertyId}?${newparams}`);
                // return;
                // return navigate(`/checkout?${newparams}`, {
                //   state: {
                //     pkgDetails,
                //     totalPrice,
                //     priceBeforeDiscount,
                //     property,
                //   },
                // });
              }}
              fit
            >
              {totalPrice ? "Book Now" : "Unavailable"}
            </CustomButton>
          </div>
        </div>
      </div>
      <div className={styles.propertyInfo} id="description">
        <div className={styles.details}>
          <div className={styles.title}>
            <h2 style={{ fontSize: "40px" }}>
              <Balancer>{property?.propertyName}</Balancer>
            </h2>
            <p style={{ marginTop: "5px" }}>
              <Balancer>{property?.address}</Balancer>
            </p>
            <p style={{ marginTop: "5px" }}>
              <Balancer>{content?.aboutProperty}</Balancer>
            </p>
          </div>
          <div className={styles.priceContainer}>
            <div className={styles.price}>
              <p>Per Night</p>
              <h3>{totalPrice ? currencyFormator(totalPrice) : ""}</h3>
            </div>
            <p>₹ 100 taxes and charges</p>
          </div>
        </div>
        <div className={styles.description}>
          <h3 style={{ fontSize: "30px" }}>Description</h3>
          {(!!content?.aboutHost || !!content?.hostName) && (
            <h4 style={{ marginTop: "10px" }}>About Host</h4>
          )}
          {!!content?.hostName && <h5>{content?.hostName}</h5>}
          {!!content?.aboutHost && <p>{content?.aboutHost}</p>}
        </div>
        <div className={styles.roomServicesContainer} id="facilities">
          <div>
            <h3>
              {property?.propertyType === "apartment" ? "Apartment" : "Room"}{" "}
              Services
            </h3>
          </div>
          <div className={styles.services} id="room-services">
            <div className={styles.highlights}>
              {property?.facilities?.map((facility) => (
                <div className={styles.service} key={facility?._id}>
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
            <div className={styles.list}>
              <h4>Main Amenities</h4>
              <ul>
                {amenities?.map((option) => (
                  <li key={option}>{option}</li>
                ))}
              </ul>
            </div>
            <div className={styles.list}>
              <h4>For Families</h4>
              <ul>
                {familyOptions?.map((option) => (
                  <li key={option}>{option}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container} id="location">
        <div className={styles.locationContainer}>
          <div className={styles.mapContainer}>
            <div className={styles.iconLink}>
              <p>View in Map</p>
              <HiOutlineChevronRight className={styles.icon} />
            </div>
            <img
              src="/images/location-map.png"
              alt="map"
              className={styles.map}
            />
          </div>
          <div className={styles.addressContainer}>
            <div className={styles.head}>
              <h3>Location</h3>
              <div className={styles.address}>
                <FaLocationDot className={styles.icon} />
                <p className={styles.addressText}>
                  <Balancer>{property?.address}</Balancer>
                </p>
              </div>
            </div>
            <div className={styles.locationInfo}>
              <div className={styles.aboutLocation}>
                <h3>About This Area</h3>
                <ul className={styles.list}>
                  <li>{content?.aboutNeighborhood}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!!rooms?.length && (
        <div className={styles.coloredContainer}>
          <div className={styles.availableRoomsContainer}>
            <div className={styles.head}>
              <h2>Availability</h2>
              <p className={styles.link}>View All</p>
            </div>
            <div className={styles.availableRoomsGroup} id="room-details">
              {rooms?.map((room) => {
                let count = 0;
                let totalCount = 0;
                pkg?.rooms?.forEach((pkgRoom) => {
                  // console.log({ pkgRoom, room });
                  if (pkgRoom.name === room.roomName) count++;
                  if (!totalCount) totalCount = pkgRoom.count;
                });
                return (
                  <RoomCard
                    pkgDetails={pkgDetails}
                    setPkgDetails={setPkgDetails}
                    key={room._id}
                    room={room}
                    count={count}
                    totalCount={totalCount}
                    property={{
                      breakfastIncluded: property?.breakfastIncluded || false,
                      parkingAvailable: property?.parkingAvailable || false,
                    }}
                    setCarouselImages={setCarouselImages}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
      <div id="reviews"></div>
      <Reviews property={property} />
    </div>
  );
}
const mapState = ({ user: { currentUser } }) => ({
  currentUser,
});
const PropertyPage = connect(mapState, { pushFlash })(ConnectedPropertyPage);
export default PropertyPage;
