import styles from "./member-info.module.scss";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { BsPlusCircle } from "react-icons/bs";
import { AiOutlineMinusCircle } from "react-icons/ai";
import CustomButton from "#components/custom-button/custom-button";
import { MdOutlineBedroomChild } from "react-icons/md";
import { RiUser4Line } from "react-icons/ri";
import { PiDoor } from "react-icons/pi";
import Counter from "#components/counter/counter";

function MemberInfo({ states }) {
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
          {!states.noOfRooms && !states.noOfAdults ? (
            "Members"
          ) : (
            <>
              <span style={{ display: "inline-flex", alignItems: "center" }}>
                <PiDoor /> &nbsp; &times; {states.noOfRooms}{" "}
              </span>{" "}
              |{" "}
              <span style={{ display: "inline-flex", alignItems: "center" }}>
                <RiUser4Line /> &nbsp; &times; {states.noOfAdults}
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
          <Counter
            title="Rooms"
            value={states.noOfRooms}
            setValue={states.setNoOfRooms}
          />
          <Counter
            title="Adults"
            subtitle="Age above or equal to 18"
            value={states.noOfAdults}
            setValue={states.setNoOfAdults}
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
