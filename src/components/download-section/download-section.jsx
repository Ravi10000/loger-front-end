import styles from "./download-section.module.scss";
import SubmitPhoneForm from "#components/submit-number-form/submit-number-form";

function DownloadSection() {
  return (
    <div className={styles.downloadSection}>
      <div className={styles.leftSection}>
        <img
          className={styles.downloadScreen}
          src="/images/graphics/download-screen.png"
          alt="download"
        />
        <div className={styles.info}>
          <div className={styles.heading}>
            <h2>Download The App Now</h2>
            <img src="/images/graphics/gift-box.png" alt="gift" />
          </div>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum the industry's standard
          </p>
          <SubmitPhoneForm />
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.downloadLinks}>
          <img
            className={styles.downloadBtn}
            src="/images/graphics/play-store.png"
            alt="play store link"
          />
          <img
            className={styles.downloadBtn}
            src="/images/graphics/app-store.png"
            alt="app store link"
          />
        </div>
        <img
          className={styles.qrCode}
          src="/images/graphics/qr-code.png"
          alt="qr code"
        />
      </div>
    </div>
  );
}

export default DownloadSection;
