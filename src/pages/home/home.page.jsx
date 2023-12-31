import styles from "./home.page.module.scss";
import HeroSection from "#components/hero-section/hero-section";
import { useState } from "react";
import PropertyCarousel from "#components/property-carousel/property-carousel";
import PromotionCard from "#components/promotion-card/promotion-card";
import DownloadSection from "#components/download-section/download-section";
import PropertyCard from "#components/property-card/property-card";
import FeedbackCard from "#components/feedback-card/feedback-card";
import { feedbacks } from "#data/feedbacks";
import FeedbackCarousel from "#components/feedback-carousel/feedback-carousel";
import ImageGrid from "#components/image-grid/image-grid";
import { fetchAllProperties } from "#api/properties.req";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import LoadingPage from "#pages/loading/loading";

const cities = [
  "Delhi NCR",
  "Mumbai",
  "Hyderabad",
  "Uttarakhand",
  "Goa",
  "Rajasthan",
];

function HomePage() {
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const propertiesQuery = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const response = await fetchAllProperties();
      return response.data?.properties;
    },
  });
  return (
    <div className={styles.homePage}>
      <HeroSection />
      {/* <h2 className={styles.title}>Recently Viewed Properties</h2>
      <div className={styles.recentPropertiesContainer}>
        <div className={styles.recentProperties}>
          {recentProperties.map((property, index) => (
            <RecentPropertyCard property={property} key={index} />
          ))}
        </div>
      </div> */}
      <div className={styles.recommendedPropertiesContainer}>
        <div className={styles.selectors}>
          <h2>Recommended Properties</h2>
          <div className={styles.locations}>
            {cities.map((city) => (
              <div
                className={`${city === selectedCity ? styles.selected : ""}`}
                key={city}
                onClick={() => setSelectedCity(city)}
              >
                {city}
              </div>
            ))}
          </div>
        </div>
      </div>
      <section className={styles.section}>
        <div className={styles.carouselContainer}>
          {propertiesQuery?.isFetching ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <LoadingPage.Loader style={{ fontSize: "20px" }} />
            </div>
          ) : propertiesQuery?.isError ? (
            "error loading properties"
          ) : (
            <PropertyCarousel length={propertiesQuery?.data?.length || 0}>
              {propertiesQuery?.data &&
                propertiesQuery?.data?.map((property) => (
                  <div key={property?._id}>
                    <div style={{ padding: "10px" }}>
                      <PropertyCard property={property} />
                    </div>
                  </div>
                ))}
            </PropertyCarousel>
          )}
        </div>
      </section>
      <h2 className={styles.title}>Accommodation Promotions</h2>
      <section className={styles.promotionsContainer}>
        <div className={styles.promotions}>
          <PromotionCard
            promotion={{
              title: "The Grand Hotel",
              subtitle:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took",
              image: "/images/promotion.png",
            }}
          />
          <PromotionCard
            promotion={{
              title: "The Grand Hotel",
              subtitle:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took",
              image: "/images/promotion.png",
            }}
          />
        </div>
      </section>
      <h2 className={styles.title}>Heavy Discount Properties</h2>
      <section className={styles.section}>
        <div className={styles.carouselContainer}>
          <PropertyCarousel length={propertiesQuery?.data?.length || 0}>
            {propertiesQuery?.data &&
              propertiesQuery?.data?.map((property) => (
                <div key={property?._id}>
                  <div style={{ padding: "10px" }}>
                    <PropertyCard item={property} />
                  </div>
                </div>
              ))}
          </PropertyCarousel>
        </div>
      </section>
      <DownloadSection />
      <h2 className={styles.title}>Around You</h2>
      <section className={styles.section}>
        <div className={styles.carouselContainer}>
          <PropertyCarousel length={propertiesQuery?.data?.length || 0}>
            {propertiesQuery?.data &&
              propertiesQuery?.data?.map((property) => (
                <div key={property?._id}>
                  <div style={{ padding: "10px" }}>
                    <PropertyCard item={property} />
                  </div>
                </div>
              ))}
          </PropertyCarousel>
        </div>
      </section>
      <h2 className={styles.title}>Our Testimonials</h2>
      <section className={styles.carouselContainer}>
        <FeedbackCarousel items={feedbacks} Component={FeedbackCard} />
      </section>
      <h2 className={styles.title}>Trending Destinations</h2>
      <section className={styles.section}>
        <ImageGrid />
      </section>
    </div>
  );
}

export default HomePage;

RecommendedProperties.propTypes = {
  city: PropTypes.string,
  selectedCity: PropTypes.string,
  setSelectedCity: PropTypes.func,
};

function RecommendedProperties({ city, selectedCity, setSelectedCity }) {
  return (
    <div className={styles.recommendedPropertiesContainer}>
      <div className={styles.selectors}>
        <h2>Recommended Properties</h2>
        <div className={styles.locations}>
          {cities.map((city) => (
            <div
              className={`${city === selectedCity ? styles.selected : ""}`}
              key={city}
              onClick={() => setSelectedCity(city)}
            >
              {city}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
