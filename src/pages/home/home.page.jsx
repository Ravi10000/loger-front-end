import styles from "./home.page.module.scss";
// import RecentPropertyCard from "#components/recent-property-card/recent-property-card";
// import { recentProperties } from "#data/recent-properties";
import HeroSection from "#components/hero-section/hero-section";
import { useState } from "react";
import PropertyCarousel from "#components/property-carousel/property-carousel";
import PromotionCard from "#components/promotion-card/promotion-card";
import DownloadSection from "#components/download-section/download-section";
// import { properties } from "#data/properties.info";
import PropertyCard from "#components/property-card/property-card";
// import LocationCard from "#components/location-card/location-card";
// import { locations } from "#data/locations";
import FeedbackCard from "#components/feedback-card/feedback-card";
import { feedbacks } from "#data/feedbacks";
import FeedbackCarousel from "#components/feedback-carousel/feedback-carousel";
// import { typesOfProperties } from "#data/types-of-properties";
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
      // console.log({ response });
      return response.data?.properties;
    },
  });
  // console.log({ properties: propertiesQuery?.data });
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
        <div
          className={styles.carouselContainer}
          // style={{ padding: "20px", outline: "2px solid red" }}
        >
          {/* <PropertyCarousel items={properties} Component={PropertyCard} /> */}
          {propertiesQuery?.isFetching ? (
            <LoadingPage.Loader style={{ margin: "auto" }}></LoadingPage.Loader>
          ) : propertiesQuery?.isError ? (
            "error loading properties"
          ) : (
            // <PropertyCarousel
            //   items={propertiesQuery?.data || []}
            //   Component={PropertyCard}
            // />
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
          {/* <PropertyCarousel items={properties} Component={PropertyCard} /> */}
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
          {/* <PropertyCarousel items={locations} Component={LocationCard} /> */}
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
      {/* <h2 className={styles.title}>Explore by Property Type</h2>
      <section className={styles.section}>
        <div className={styles.carouselContainer}>
          <PropertyCarousel
            propertyType
            items={typesOfProperties}
            Component={LocationCard}
          />
        </div>
      </section> */}
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
