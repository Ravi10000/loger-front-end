import styles from "./member-info.module.scss";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { BsPlusCircle } from "react-icons/bs";
import { AiOutlineMinusCircle } from "react-icons/ai";
import CustomButton from "#components/custom-button/custom-button";

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
        <p>Members</p>
        <IoIosArrowDown
          className={`${styles.arrow} ${showMenu ? styles.active : ""}`}
        />
      </div>
      {showMenu && (
        <div className={styles.menu}>
          <Detail
            title="Rooms"
            value={states.noOfRooms}
            setValue={states.setNoOfRooms}
          />
          <Detail
            title="Adults"
            subtitle="Age above or equal to 18"
            value={states.noOfAdults}
            setValue={states.setNoOfAdults}
          />
          <Detail
            title="Childrens"
            subtitle="Age below 18"
            value={states.noOfChildren}
            setValue={states.setNoOfChildren}
          />
          <div className={styles.buttonContainer}>
            <CustomButton onClick={closeMenu}>Done</CustomButton>
          </div>
        </div>
      )}
    </div>
  );
}

function Detail({ title, subtitle, value, setValue }) {
  const decrement = () => {
    if (value <= 0) return;
    setValue((prevCount) => (prevCount = prevCount - 1));
  };
  const increment = () => {
    setValue((prevCount) => (prevCount = prevCount + 1));
  };
  return (
    <div className={styles.detail}>
      <div className={styles.heading}>
        <h4 className={styles.title}>{title}</h4>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <div className={styles.actions}>
        <AiOutlineMinusCircle
          className={`${styles.icon} ${styles.minus}`}
          onClick={decrement}
        />
        <p>{value}</p>
        <BsPlusCircle
          className={`${styles.icon} ${styles.plus}`}
          onClick={increment}
        />
      </div>
    </div>
  );
}
export default MemberInfo;
