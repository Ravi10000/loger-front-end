import styles from "./location-card.module.scss";

function LocationCard({ item, propertyType }) {
  return (
    <div className={styles.locationCard}>
      <img className={styles.locationImage} src={item?.image} alt="property" />
      <div className={styles.infoContainer}>
        <h2>
          {propertyType ? (
            <span>{item?.type}</span>
          ) : (
            <>
              {item?.city} - <span>{item?.state}</span>
            </>
          )}
        </h2>
        <div className={styles.info}>
          <p>{item?.propertiesCount} properties</p>
          <div className={styles.seperator}></div>
          <div className={styles.link}>
            <p>See More</p>
            <img
              className={styles.arrow}
              src="/images/icons/arrow-right.svg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationCard;
