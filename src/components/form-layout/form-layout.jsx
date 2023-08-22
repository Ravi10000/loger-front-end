import styles from "./form-layout.module.scss";

function FormLayout({ children, image }) {
  return (
    <div className={styles.formLayout}>
      <div className={styles.container}>
        {children}
        <div className={styles.imageContainer}>
          <img src={image} alt="graphics" />
        </div>
      </div>
    </div>
  );
}

export default FormLayout;
