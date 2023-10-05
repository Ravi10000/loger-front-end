import styles from "./flash.module.scss";
// packages
import { connect } from "react-redux";
import { useEffect, useState } from "react";

// icons
import { FaCircleCheck } from "react-icons/fa6";
import { AiFillInfoCircle } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { PiWarningFill } from "react-icons/pi";
import { BiSolidCommentError } from "react-icons/bi";
import { clearFlash } from "../../redux/flash/flash.actions";

const icons = {
  success: <FaCircleCheck color="var(--success-clr)" className={styles.icon} />,
  error: (
    <BiSolidCommentError color="var(--error-clr)" className={styles.icon} />
  ),
  warning: <PiWarningFill color="var(--warning-clr)" className={styles.icon} />,
  info: <AiFillInfoCircle color="var(--info-clr)" className={styles.icon} />,
};

function Flash({ flash: { type, message, id }, clearFlash }) {
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    const clear = setTimeout(() => {
      clearFlash(id);
    }, 8000);
    return () => {
      clearTimeout(clear);
    };
  }, [type]);

  return (
    <div
      className={`${styles.flash} ${styles[type]} ${clicked && styles.outro}`}
    >
      <div className={styles.details}>
        {icons[type]}
        <h5
          className={styles.message}
          style={{
            color: `var(--${type}-clr)`,
          }}
        >
          {message}
        </h5>
      </div>
      <button
        className={styles.closeBtn}
        onClick={() => {
          setClicked(true);
          setTimeout(() => {
            clearFlash(id);
          }, 1000);
        }}
      >
        <IoClose color="var(--card-text-clr)" className={styles.icon} />
      </button>
    </div>
  );
}

export default connect(null, { clearFlash })(Flash);
