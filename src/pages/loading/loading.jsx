import styles from "./loading.module.scss";

function LoadingPage() {
  return (
    <section className={styles.loadingPage}>
      <div className={styles.loader}></div>
    </section>
  );
}

export default LoadingPage;
