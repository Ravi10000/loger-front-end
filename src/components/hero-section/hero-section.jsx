import styles from "./hero.module.scss";
import Search from "#components/search/search";
import { Balancer } from "react-wrap-balancer";
import PropTypes from "prop-types";

HeroSection.propTypes = {
  small: PropTypes.bool,
};

function HeroSection({ small }) {
  return (
    <div className={`${styles.heroSection} ${small && styles.small}`}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h1>COMFORT</h1>
          <p>
            <Balancer>
              Search low prices on hotels, homes and much more...
            </Balancer>
          </p>
        </div>
        <Search />
      </div>
    </div>
  );
}

export default HeroSection;
