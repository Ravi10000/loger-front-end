import styles from "./home.page.module.scss";
import RecentPropertyCard from "#components/recent-property-card/recent-property-card";
import { recentProperties } from "#data/recent-properties";
import HeroSection from "#components/hero-section/hero-section";
import { properties } from "#data/properties.info";
import PropertyCard from "#components/property-card/property-card";
import { useState } from "react";
import PropertyCarousel from "#components/property-carousel/property-carousel";
import PromotionCard from "#components/promotion-card/promotion-card";

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
  return (
    <div className={styles.homePage}>
      <HeroSection />
      <div className={styles.recentPropertiesContainer}>
        <h2>Recently Viewed Properties</h2>
        <div className={styles.recentProperties}>
          {recentProperties.map((property, index) => (
            <RecentPropertyCard property={property} key={index} />
          ))}
        </div>
      </div>
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
      <div className={styles.carouselContainer}>
        <PropertyCarousel />
      </div>
      <div className={styles.promotionsContainer}>
        <h2>Accommodation Promotions</h2>
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
      </div>
    </div>
  );
}

export default HomePage;
