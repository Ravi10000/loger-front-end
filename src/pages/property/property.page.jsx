import styles from "./property.page.module.scss";

import { Fragment, useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
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
import { roomDetail } from "#data/room.data";
import { HashLink } from "react-router-hash-link";
import Reviews from "#components/reviews/reviews";
import { useQuery } from "@tanstack/react-query";
import { fetchProperty } from "#api/properties.req";
import { Link } from "react-router-dom";

const gridFooterOptions = [
  "Overview",
  "Room Services",
  "Location",
  "Amenities",
  "Policies",
  "Reviews",
];

function PropertyPage() {
  const { state } = useLocation();
  const pkg = state?.pkg || [];
  console.log({ pkg });
  const [totalPrice, setTotalPrice] = useState(0);
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
  const [searchParams, setSearchParams] = useSearchParams();
  const currentUrlParams = searchParams.toString();
  const { propertyId } = useParams();
  console.log({ propertyId, currentUrlParams });

  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(gridFooterOptions[0]);
  const [isSaved, setIsSaved] = useState(false);

  const propertyQuery = useQuery({
    queryKey: ["property", propertyId],
    enabled: !!propertyId,
    queryFn: async () => {
      try {
        const res = await fetchProperty(propertyId);
        console.log({ res });
        return res?.data || {};
      } catch (err) {
        console.error({ err: err.response.data });
      }
    },
  });

  const property = propertyQuery?.data?.property;
  const rooms = propertyQuery?.data?.rooms;
  console.log({ rooms });
  console.log({ property });
  const isError = propertyQuery.isError;
  const isLoading = propertyQuery.isLoading;
  const mainPhoto = property?.photos?.find((photo) => photo?.isMain);
  // const [foundMainPhoto, setFoundMainPhoto] = useState(false);
  let foundMainPhoto = false;

  useEffect(() => {
    let price = 0;
    Object.values(pkgDetails).forEach((room) => {
      price += room.count * room.discountedPrice;
    });
    setTotalPrice(price);
  }, [pkgDetails]);

  return (
    <div className={styles.propertyPage}>
      <div className={styles.headContainer}>
        <div className={styles.head}>
          <h2>Choose Date to View Prices</h2>
          <Search />
        </div>
      </div>
      <div className={styles.imageGridContainer}>
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
            <div
              className={styles.action}
              onClick={() => setIsSaved((prevState) => !prevState)}
            >
              <div className={styles.iconContainer}>
                {isSaved ? (
                  <AiFillHeart className={`${styles.icon} ${styles.liked}`} />
                ) : (
                  <AiOutlineHeart className={`${styles.icon}`} />
                )}
              </div>
              <p>Save</p>
            </div>
          </div>
        </div>
        <div className={styles.imageGrid}>
          {!isLoading && !isError && (
            <>
              <div
                key={mainPhoto?._id}
                style={{
                  background: `url("${import.meta.env.VITE_SERVER_URL}/images/${
                    mainPhoto?.photoUrl
                  }")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              {property?.photos?.map((photo, idx) => {
                if (photo?.isMain) {
                  foundMainPhoto = true;
                  return <Fragment key="mainPhotoSkipped"></Fragment>;
                }

                if (foundMainPhoto && idx > 6)
                  return <Fragment key={photo?._id}></Fragment>;

                if (!foundMainPhoto && idx > 5)
                  return <Fragment key={photo?._id}></Fragment>;

                return (
                  <div
                    key={photo?._id}
                    style={{
                      background: `url("${
                        import.meta.env.VITE_SERVER_URL
                      }/images/${photo?.photoUrl}")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                );
              })}
              {property?.photos?.length - 8 > 0 &&
              property?.photos?.length - 8 > 1 ? (
                <div
                  key="rest of the photos"
                  style={{
                    background: `linear-gradient(to bottom, #1c1c1e84, #1c1c1e84),
            url("/images/property/seven.png")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <h4>+{property?.photos?.length - 8} photos</h4>
                </div>
              ) : (
                <div
                  key="last photo"
                  style={{
                    background: `url("${
                      import.meta.env.VITE_SERVER_URL
                    }/images/${
                      property?.photos?.[property?.photos?.length - 1]?.photoUrl
                    }")`,
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
            {gridFooterOptions?.map((option, idx) => (
              <p
                onClick={() => setSelectedOption(option)}
                className={`${styles.option} ${
                  selectedOption === option ? styles.selected : ""
                } `}
                key={idx}
              >
                {option}
              </p>
            ))}
          </div>
          <div className={styles.right}>
            <p>7 days left</p>
            {/* <HashLink
              to={`/property/${propertyId}?${currentUrlParams}/#reserve-room`}
            > */}
            <Link to="/checkout">
              <CustomButton fit>Book Now</CustomButton>
            </Link>
            {/* </HashLink> */}
          </div>
        </div>
      </div>
      <div className={styles.propertyInfo}>
        <div className={styles.details}>
          <div className={styles.title}>
            <h2>
              <Balancer>{property?.propertyName}</Balancer>
            </h2>
            <p>
              <Balancer>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Balancer>
            </p>
          </div>
          <div className={styles.priceContainer}>
            <div className={styles.price}>
              <p>Per Night</p>
              <h3>₹ {totalPrice}</h3>
            </div>
            <p>₹ 100 taxes and charges</p>
          </div>
        </div>
        <div className={styles.description}>
          <h3>Description</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset <span>Read More...</span>
          </p>
        </div>
        <div className={styles.roomServicesContainer}>
          <div>
            <h3>Room Servicess</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
          <p className={styles.servicesDescription}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took
          </p>
          <div className={styles.services}>
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
            {/* <div className={styles.highlights}>
              <div className={styles.service}>
                <img src="/images/highlight-icons/bed.svg" alt="" />
                <p>Luxury Bed</p>
              </div>
              <div className={styles.service}>
                <img src="/images/highlight-icons/ice.svg" alt="" />
                <p>Air Conditioner</p>
              </div>
              <div className={styles.service}>
                <img src="/images/highlight-icons/pool.svg" alt="" />
                <p>Swimming Pool</p>
              </div>
              <div className={styles.service}>
                <img src="/images/highlight-icons/food.svg" alt="" />
                <p>Breakfast/Lunch/Dinner</p>
              </div>
              <div className={styles.service}>
                <img src="/images/highlight-icons/cab.svg" alt="" />
                <p>Car/Taxi</p>
              </div>
              <div className={styles.service}>
                <img src="/images/highlight-icons/towel.svg" alt="" />
                <p>Laundry</p>
              </div>
              <div className={styles.service}>
                <img src="/images/highlight-icons/24.svg" alt="" />
                <p>24/7 Help & Support</p>
              </div>
              <div className={styles.service}>
                <img src="/images/highlight-icons/wifi.svg" alt="" />
                <p>Free WiFi</p>
              </div>
              <div className={styles.service}>
                <img src="/images/highlight-icons/drink.svg" alt="" />
                <p>Bar & Restaurant</p>
              </div>
              <div className={styles.service}>
                <img src="/images/highlight-icons/parking.svg" alt="" />
                <p>Free Parking</p>
              </div>
            </div> */}
            <div className={styles.list}>
              <h4>Main Amenities</h4>
              <ul>
                <li>Daily Housekeeping</li>
                <li>Restaurant & Bar/Lounge</li>
                <li>Outdoor Pool</li>
                <li>Breakfast Available</li>
                <li>Fitness Center</li>
                <li>Coffee Shop/Café</li>
                <li>24-hour Business Center</li>
              </ul>
            </div>
            <div className={styles.list}>
              <h4>For Families</h4>
              <ul>
                <li>Children Stay Free</li>
                <li>Free cribs/infant beds</li>
                <li>Refrigerator</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container}>
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
                  <li className={styles.bold}>What's Nearby</li>
                  <li>Hospital - 10 Min Drive</li>
                  <li>Ganga Arti - 15 Min Walking</li>
                  <li>Rishikesh - 1.2km</li>
                  <li>Laxman Jhula - 10 Min Walking</li>
                  <li>Ram Jhula - 10 Min Walking</li>
                  <li>Mansa Temple - 20 Min Drive</li>
                  <li>Triveni Ghat - 15 Min Drive</li>
                  <li>Jumping Heights - 19 Min Walking</li>
                  <li>Super Market - 7 Min Walking</li>
                </ul>
              </div>
              <div className={styles.aboutLocation}>
                <h3>Getting Around</h3>
                <ul className={styles.list}>
                  <li className={styles.bold}>Routes Nearby</li>
                  <li>Taxi Stand - 10 Min Walking</li>
                  <li>Bus Stand - 10 Min Walking</li>
                  <li>National Highway - 10 Min Walking</li>
                  <li>Local Routes - 10 Min Walking</li>
                  <li>Air Port - 1.2km Drive</li>
                  <li>Railway Station - 10 Min Walking</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.coloredContainer}>
        <div className={styles.availableRoomsContainer}>
          <div className={styles.head}>
            <h2>Availability</h2>
            <p className={styles.link}>View All</p>
          </div>
          <div className={styles.availableRoomsGroup} id="reserve-room">
            {/* {Array(4)
              .fill()
              .map((_, i) => (
                <RoomCard key={i} room={roomDetail} />
              ))} */}
            {rooms?.map((room) => {
              let count = 0;
              let totalCount = 0;
              pkg?.rooms?.forEach((pkgRoom) => {
                console.log({ pkgRoom, room });
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
                />
              );
            })}
          </div>
        </div>
      </div>
      <Reviews />
    </div>
  );
}

export default PropertyPage;
