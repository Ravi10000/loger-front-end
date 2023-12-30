import styles from "./footer.module.scss";
import { footerOptions } from "#data/footer-options";
import { useNavigate, useLocation } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const hideHeader = pathname?.includes("reset-password");
  return (
    <footer
      className={styles.footer}
      style={hideHeader ? { display: "none" } : {}}
    >
      <div className={styles.container}>
        <div className={styles.groupMenu}>
          <div className={styles.menuContainer}>
            {footerOptions.map((option, index) => (
              <div className={styles.menu} key={index}>
                <h2>{option?.title}</h2>
                <ul>
                  {option?.options.map((item, index) => (
                    <li onClick={() => navigate(item?.path)} key={index}>
                      {item?.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className={styles.connect}>
            <form className={styles.newsletterForm}>
              <div className={styles.heading}>
                <h3>Save Your Time & Money</h3>
                <p>Sign up and we'll send the best deals to you</p>
              </div>
              <div className={styles.inputContainer}>
                <input placeholder="Please Enter Your Email Address" />
                <button>Subscribe</button>
              </div>
            </form>
            <div className={styles.rightSection}>
              <div className={styles.socialMedia}>
                <h3>Follow Us</h3>
                <div className={styles.links}>
                  <img src="/images/icons/ig.png" alt="instagram" />
                  <img src="/images/icons/yt.png" alt="youtube" />
                  <img src="/images/icons/fb.png" alt="facebook" />
                  <img src="/images/icons/tw.png" alt="twitter" />
                </div>
              </div>
              <div className={styles.downloadApp}>
                <img
                  className={styles.downloadIcon}
                  src="/images/graphics/app-store.png"
                  alt="app store"
                />
                <img
                  className={styles.downloadIcon}
                  src="/images/graphics/play-store.png"
                  alt="play store"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className={styles.bottomMessage}>
        All material herein © 2023 Loger.ma All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;
