import styles from "./member-info.module.scss";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import CustomButton from "#components/custom-button/custom-button";
import { RiUser4Line } from "react-icons/ri";
import { PiDoor } from "react-icons/pi";
import Counter from "#components/counter/counter";

import PropTypes from "prop-types";

MemberInfo.propTypes = {
  noOfRooms: PropTypes.number,
  setNoOfRooms: PropTypes.func,
  noOfAdults: PropTypes.number,
  setNoOfAdults: PropTypes.func,
};

function MemberInfo({ noOfRooms, setNoOfRooms, noOfAdults, setNoOfAdults }) {
  const [showMenu, setShowMenu] = useState(false);
  const closeMenu = () => setShowMenu(false);
  const menuRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target))
        closeMenu();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);
  return (
    <div className={styles.memberInfo} ref={menuRef}>
      <div
        className={styles.selector}
        onClick={() => setShowMenu((prevState) => !prevState)}
      >
        <img src="/images/icons/users.svg" alt="members" />
        <p>
          {!noOfRooms && !noOfAdults ? (
            "Members"
          ) : (
            <>
              <span style={{ display: "inline-flex", alignItems: "center" }}>
                <PiDoor /> &nbsp; &times; {noOfRooms}{" "}
              </span>{" "}
              |{" "}
              <span style={{ display: "inline-flex", alignItems: "center" }}>
                <RiUser4Line /> &nbsp; &times; {noOfAdults}
              </span>
            </>
          )}
        </p>
        <IoIosArrowDown
          className={`${styles.arrow} ${showMenu ? styles.active : ""}`}
        />
      </div>
      {showMenu && (
        <div className={styles.menu}>
          <Counter title="Rooms" value={noOfRooms} setValue={setNoOfRooms} />
          <Counter
            title="Adults"
            subtitle="Age above or equal to 18"
            value={noOfAdults}
            setValue={setNoOfAdults}
          />
          <div className={styles.buttonContainer}>
            <CustomButton onClick={closeMenu}>Done</CustomButton>
          </div>
        </div>
      )}
    </div>
  );
}

export default MemberInfo;
