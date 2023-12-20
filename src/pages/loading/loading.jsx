import styles from "./loading.module.scss";

function LoadingPage() {
  return (
    <section className={styles.loadingPage}>
      <LoadingPage.Loader />
    </section>
  );
}
LoadingPage.Loader = function Loader() {
  return <div className={styles.loader}></div>;
};

export default LoadingPage;
