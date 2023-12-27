import styles from "./with-backdrop.module.scss";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

WithBackdrop.propTypes = {
  children: PropTypes.node.isRequired,
  close: PropTypes.func.isRequired,
  left: PropTypes.bool,
};

export default function WithBackdrop({ children, close, left }) {
  const backdropRef = useRef(null);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    backdropRef.current.style.overflowY = "scroll";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      className={`${styles.popupRef} ${left ? styles.left : ""}`}
      ref={backdropRef}
      onClick={() => {
        close && close();
      }}
    >
      {children}
    </div>
  );
}
