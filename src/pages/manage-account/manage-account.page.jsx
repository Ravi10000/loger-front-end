import styles from "./manage-account.page.module.scss";
import { accountData } from "../../data/account.data";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ManageAccountPage() {
  return (
    <div className={styles.manageAccountPage}>
      <div className={styles.container}>
        <div className={styles.head}>
          <h1>Manage Account</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is
            simply dummy
          </p>
        </div>
        <div className={styles.options}>
          {accountData?.map((option) => (
            <OptionCard option={option} key={option?.link} />
          ))}
        </div>
      </div>
    </div>
  );
}

function OptionCard({ option }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={styles.optionCard}
      onClick={() => navigate(option?.link)}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <img
        src={hovered ? option?.hoveredIcon : option?.icon}
        alt={option?.title}
      />
      <div className={styles.info}>
        <h2>{option?.title}</h2>
        <p>{option?.subtitle}</p>
        <a className={styles.link}>{option?.linkText}</a>
      </div>
    </div>
  );
}

export default ManageAccountPage;
