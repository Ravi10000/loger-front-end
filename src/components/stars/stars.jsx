import { RiStarFill, RiStarHalfFill, RiStarLine } from "react-icons/ri";
import styles from "./stars.module.scss";

function Stars({ ratings, color, size = 25 }) {
  const filledStars = parseInt(ratings);
  const halfStar = ratings - filledStars >= 0.4;
  const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);
  return (
    <div className={styles.stars}>
      {ratings && (
        <>
          {[...Array(filledStars)].map((_, i) => (
            <RiStarFill
              style={{ height: size, ...(color && { color }) }}
              key={`${i}-filled`}
              className={styles.star}
            />
          ))}
          {emptyStars && (
            <RiStarHalfFill
              style={{ height: size, ...(color && { color }) }}
              key="half-filled"
              className={styles.star}
            />
          )}
          {[...Array(emptyStars)].map((_, i) => (
            <RiStarLine
              style={{ height: size, ...(color && { color }) }}
              key={`${i}-line`}
              className={styles.star}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default Stars;
