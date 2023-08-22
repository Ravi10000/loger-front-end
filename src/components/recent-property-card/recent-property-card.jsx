import styles from "./recent-property-card.module.scss";
function RecentPropertyCard({ property: { image, name, time } }) {
  return (
    <div className={styles.propertyCard}>
      <img src={image} />
      <div className={styles.info}>
        <h3>{name}</h3>
        <p>{time}</p>
      </div>
    </div>
  );
}

export default RecentPropertyCard;
