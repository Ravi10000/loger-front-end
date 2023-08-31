import styles from "./member-info.module.scss";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { BsPlusCircle } from "react-icons/bs";
import { AiOutlineMinusCircle } from "react-icons/ai";
import CustomButton from "#components/custom-button/custom-button";

function MemberInfo() {
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
          <Detail title="Rooms" />
          <Detail title="Adults" subtitle="Age above or equal to 18" />
          <Detail title="Childrens" subtitle="Age below 18" />
          <div className={styles.buttonContainer}>
            <CustomButton onClick={closeMenu}>Done</CustomButton>
          </div>
        </div>
      )}
    </div>
  );
}

function Detail({ title, subtitle }) {
  const [count, setCount] = useState(0);
  const decrement = () => {
    if (count <= 0) return;
    setCount((prevCount) => (prevCount = prevCount - 1));
  };
  const increment = () => {
    setCount((prevCount) => (prevCount = prevCount + 1));
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
        <p>{count}</p>
        <BsPlusCircle
          className={`${styles.icon} ${styles.plus}`}
          onClick={increment}
        />
      </div>
    </div>
  );
}
export default MemberInfo;
