import styles from "./image-grid.module.scss";
import { trendings } from "#data/tendings";

function ImageGrid() {
  return (
    <div className={styles.imageGrid}>
      {trendings.map((trending) => {
        return (
          <div
            className={styles.imageContainer}
            key={trending?._id}
            style={{
              background: `url("${trending?.image}")`,
              backgroundSize: "cover",
            }}
          >
            <div className={styles.info}>
              <h3>{trending?.name}</h3>
              <img src="/images/locations/india.png" alt="" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ImageGrid;
