import styles from "./flash-group.module.scss";
import Flash from "../flash/flash";
import { connect } from "react-redux";

function FlashGroup({ flashList }) {
  return (
    <section className={styles.flashGroup}>
      {flashList?.reverse().map((flash) => (
        <Flash flash={flash} key={flash.id} />
      ))}
    </section>
  );
}
const mapState = (state) => ({
  flashList: state.flash,
});
export default connect(mapState)(FlashGroup);
