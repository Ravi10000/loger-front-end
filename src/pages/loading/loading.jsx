import styles from "./loading.module.scss";
import PropTypes from "prop-types";
import { TbLoader2 } from "react-icons/tb";
function LoadingPage() {
  return (
    <section className={styles.loadingPage}>
      <LoadingPage.Loader />
    </section>
  );
}

Loader.propTypes = {
  style: PropTypes.object,
};

function Loader({ style = {} }) {
  return <TbLoader2 style={style} className={styles.loader} />;
  // return <div className={styles.loader} style={style}></div>;
}
LoadingPage.Loader = Loader;

export default LoadingPage;
