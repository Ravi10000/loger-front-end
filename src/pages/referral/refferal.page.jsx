import styles from "./refferal.page.module.scss";
import CustomInput from "#components/custom-input/custom-input";
import { PiArrowLeftBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Balancer from "react-wrap-balancer";
import { BiLogoFacebook, BiLogoWhatsapp } from "react-icons/bi";

function RefferalPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.refferalPage}>
      <div className={styles.iconLink} onClick={() => navigate(-1)}>
        <PiArrowLeftBold className={`${styles.backIcon} ${styles.icon}`} />
        <p>Go Back</p>
      </div>
      <div className={styles.heroSectionContainer}>
        <div className={styles.heroSection}>
          <h1>
            <Balancer>Invite Your Friends & Earn Coins</Balancer>
          </h1>
          <p>
            <Balancer>
              Lorem Ipsum is simply dummy text of the printing and type setting
              industry.
            </Balancer>
          </p>
          <div className={styles.steps}>
            <div className={styles.step}>
              <img className={styles.stepImg} src="/images/step-1.png" alt="" />
              <h3>
                <Balancer>Lorem Ipsum is simply dummy</Balancer>
              </h3>
              <p>
                <Balancer>
                  Lorem Ipsum is simply dummy text of the printing and type
                  setting industry. Lorem Ipsum is simply dummy text of the and
                  printing type setting industry.
                </Balancer>
              </p>
            </div>
            <div className={styles.arrowContainer}>
              <img
                className={styles.arrow}
                src="/images/icons/directional-arrow.svg"
                alt=""
              />
            </div>
            <div className={styles.step}>
              <img className={styles.stepImg} src="/images/step-2.png" alt="" />
              <h3>
                <Balancer>Lorem Ipsum is simply dummy</Balancer>
              </h3>
              <p>
                <Balancer>
                  Lorem Ipsum is simply dummy text of the printing and type
                  setting industry. Lorem Ipsum is simply dummy text of the and
                  printing type setting industry.
                </Balancer>
              </p>
            </div>
            <div className={styles.arrowContainer}>
              <img
                className={styles.arrow}
                src="/images/icons/directional-arrow.svg"
                alt=""
              />
            </div>
            <div className={styles.step}>
              <img className={styles.stepImg} src="/images/step-3.png" alt="" />
              <h3>
                <Balancer>Lorem Ipsum is simply dummy</Balancer>
              </h3>
              <p>
                <Balancer>
                  Lorem Ipsum is simply dummy text of the printing and type
                  setting industry. Lorem Ipsum is simply dummy text of the and
                  printing type setting industry.
                </Balancer>
              </p>
            </div>
          </div>
          <div className={styles.refferalLink}>
            <p>
              <Balancer>
                https://www.figma.com/file/8QskOYBU1UG5RBgrTZyUK3/Loger.ma
              </Balancer>
            </p>
            <button>Copy Link</button>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <h2>Share Your Refferable Link</h2>
        <div className={styles.invitaionsContainer}>
          <div className={styles.invitation}>
            <h3>Email Address</h3>
            <p>Invite Friends</p>
            <CustomInput placeholder="loger.ma@gmail.com" />
            <button className={styles.inviteButton}>Invite</button>
          </div>
          <div className={styles.invitation}>
            <h3>Send SMS</h3>
            <p>Invite Friends</p>
            <CustomInput placeholder="888 215 7770" />
            <button className={styles.inviteButton}>Invite</button>
          </div>
          <div className={styles.invitation}>
            <h3>Social Media</h3>
            <p>Share on Facebook Whatsapp or Others </p>
            <div className={`${styles.socialLink} ${styles.fb}`}>
              <BiLogoFacebook className={styles.icon} />
              Share on Facebook
            </div>
            <div className={`${styles.socialLink} ${styles.wa}`}>
              <BiLogoWhatsapp className={styles.icon} />
              Share on WhatsApp
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RefferalPage;
