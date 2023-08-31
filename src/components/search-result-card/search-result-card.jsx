import styles from "./search-result-card.module.scss";

function SearchResultCard({ hotel }) {
  return (
    <div className={styles.searchResultCard}>
      <img src="/images/property (2).png" alt="property" />
    </div>
  );
}

export default SearchResultCard;
