import styles from "./promotion-card.module.scss";
import CustomButton from "#components/custom-button/custom-button";

function PromotionCard({ promotion }) {
  return (
    <div className={styles.promotionCard}>
      <div className={styles.info}>
        <h3>{promotion?.title}</h3>
        <p>{promotion?.subtitle}</p>
        <CustomButton fit>Find a Stay</CustomButton>
      </div>
      <img src={promotion?.image} alt="promotion" />
    </div>
  );
}

export default PromotionCard;
