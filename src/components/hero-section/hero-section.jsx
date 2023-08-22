import styles from "./hero.module.scss";

function HeroSection() {
  return (
    <div className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h1>COMFORT</h1>
          <p>Search low prices on hotels, homes and much more...</p>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
