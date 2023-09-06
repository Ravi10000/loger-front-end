import { Balancer } from "react-wrap-balancer";
import styles from "./hero-content.module.scss";

function HeroContent({ image, title, subtitle }) {
  return (
    <div
      className={styles.heroSection}
      style={{
        background: `linear-gradient(to right, #1a232f80, #1a232f80),
        url("${image}")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className={styles.content}>
        <h1>
          <Balancer>{title}</Balancer>
        </h1>
        <p>
          <Balancer>{subtitle}</Balancer>
        </p>
      </div>
    </div>
  );
}

export default HeroContent;
