import styles from "./property.page.module.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Balancer } from "react-wrap-balancer";

import { PiArrowLeftBold } from "react-icons/pi";
import { GoShareAndroid } from "react-icons/go";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { HiOutlineChevronRight } from "react-icons/hi";
import { FaLocationDot } from "react-icons/fa6";
import { BsArrowRight } from "react-icons/bs";

import CustomButton from "#components/custom-button/custom-button";
import Search from "#components/search/search";
import RoomCard from "#components/room-card/room-card";
import { roomDetail } from "#data/room.data";
import RatingBar from "#components/review-bar/rating-bar";
import { RiStarFill } from "react-icons/ri";
import UserReviewCard from "#components/user-review-card/user-review-card";
import { HashLink } from "react-router-hash-link";

const gridFooterOptions = [
  "Overview",
  "Room Services",
  "Location",
  "Amenities",
  "Policies",
  "Reviews",
];

function PropertyPage() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(gridFooterOptions[0]);
  const [isSaved, setIsSaved] = useState(false);
  const [currentUserReviewPage, setCurrentUserReviewPage] = useState(1);

  const nextReviewPage = () => {
    if (currentUserReviewPage < 5) {
      setCurrentUserReviewPage((prevState) => prevState + 1);
    }
  };
  const prevReviewPage = () => {
    if (currentUserReviewPage > 0) {
      setCurrentUserReviewPage((prevState) => prevState - 1);
    }
  };

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
          <div
            style={{
              background: `url("/images/property/one.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div
            style={{
              background: `url("/images/property/two.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div
            style={{
              background: `url("/images/property/three.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          <div
            style={{
              background: `url("/images/property/five.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div
            style={{
              background: `url("/images/property/four.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div
            style={{
              background: `url("/images/property/six.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div
            style={{
              background: `url("/images/property/six.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div
            style={{
              background: `linear-gradient(to bottom, #1c1c1e84, #1c1c1e84),
            url("/images/property/seven.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h4>+20 photos</h4>
          </div>
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
            <HashLink to="/property/#reserve-room">
              <CustomButton fit>Reserve a Room</CustomButton>
            </HashLink>
          </div>
        </div>
      </div>
      <div className={styles.propertyInfo}>
        <div className={styles.details}>
          <div className={styles.title}>
            <h2>
              <Balancer>Tirath View, Haridwar - A Four Star Luxury</Balancer>
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
              <h3>₹ 3,500</h3>
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
            </div>
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
                  <Balancer>
                    Mahipal Khandari, near Ramaya Inn, Haridwar, Pin
                    Code:249410, Haridwar, India
                  </Balancer>
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
            {Array(4)
              .fill()
              .map((_, i) => (
                <RoomCard key={i} room={roomDetail} />
              ))}
          </div>
        </div>
      </div>
      <div className={styles.reviewContainer}>
        <div className={styles.left}>
          <div className={styles.ratingsContainer}>
            <h3>Reviews</h3>
            <div className={styles.rating}>
              <h2>4.0</h2>
              <div className={styles.ratingInfo}>
                <p>
                  Out of <br />5 Star
                </p>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <RiStarFill className={styles.star} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.ratingGraph}>
            <RatingBar
              ratingDetails={{
                count: 45,
                totalCount: 100,
                name: "5 Stars",
                filledColor: "#00C964",
                emptyColor: "#E6FAF0",
              }}
            />
            <RatingBar
              ratingDetails={{
                count: 25,
                totalCount: 100,
                name: "4 Stars",
                filledColor: "#0868F8",
                emptyColor: "#E7F0FF",
              }}
            />
            <RatingBar
              ratingDetails={{
                count: 15,
                totalCount: 100,
                name: "3 Stars",
                filledColor: "#FCBB06",
                emptyColor: "#FFF9E7",
              }}
            />
            <RatingBar
              ratingDetails={{
                count: 10,
                totalCount: 100,
                name: "2 Stars",
                filledColor: "#F87B08",
                emptyColor: "#FFF2E7",
              }}
            />
            <RatingBar
              ratingDetails={{
                count: 5,
                totalCount: 100,
                name: "1 Stars",
              }}
            />
          </div>
        </div>
        <div className={styles.right}>
          <h3>For Our Reviews</h3>
          <p>
            <Balancer>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Balancer>
          </p>
          <div className={styles.sectionReviewsContainer}>
            <div className={styles.sectionReview}>
              <h4>7.9/10</h4>
              <p>Cleanliness</p>
            </div>
            <div className={styles.sectionReview}>
              <h4>7.5/10</h4>
              <p>Staff & Service</p>
            </div>
            <div className={styles.sectionReview}>
              <h4>7.5/10</h4>
              <p>Amenities</p>
            </div>
            <div className={styles.sectionReview}>
              <h4>7.5/10</h4>
              <p>Property Conditions & Facilities</p>
            </div>
            <div className={styles.sectionReview}>
              <h4>4.3/10</h4>
              <p>Eco-friendliness</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.userReviewsContainer}>
        <div className={styles.head}>
          <h2>See What Guests Loved the Most:</h2>
          <CustomButton fit>View All</CustomButton>
        </div>
        <div className={styles.userReviews}>
          <UserReviewCard />
          <UserReviewCard />
          <UserReviewCard />
          <UserReviewCard />
        </div>
        <div className={styles.reviewNav}>
          <div
            className={`${styles.arrowContainer} ${
              currentUserReviewPage <= 1 ? styles.disabled : ""
            }`}
            onClick={prevReviewPage}
          >
            <BsArrowRight className={styles.arrow} />
          </div>
          <div className={styles.pages}>
            {[...Array(5)].map((_, i) => (
              <p
                className={`${styles.page} ${
                  currentUserReviewPage === i + 1 ? styles.active : ""
                }`}
              >
                {i + 1}
              </p>
            ))}
          </div>
          <div
            className={`${styles.arrowContainer} ${
              currentUserReviewPage >= 5 ? styles.disabled : ""
            }`}
            onClick={nextReviewPage}
          >
            <BsArrowRight className={styles.arrow} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyPage;
