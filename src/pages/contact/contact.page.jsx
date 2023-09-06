import styles from "./contact.page.module.scss";

import CustomButton from "#components/custom-button/custom-button";
import CustomInput from "#components/custom-input/custom-input";
import HeroContent from "#components/hero-content/hero-content";
import { Link } from "react-router-dom";
import { Balancer } from "react-wrap-balancer";

function ContactPage() {
  return (
    <div className={styles.contactPage}>
      <HeroContent
        image="/images/contact-hero.png"
        title="Contact Us"
        subtitle="Lorem Ipsum is simply dummy text of the printing and type setting"
      />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.contentBox}>
            <div className={styles.head}>
              <h3>Contacts</h3>
              <div className={styles.socialMediaLinks}>
                <img src="/images/icons/ig.svg" alt="instagram" />
                <img src="/images/icons/yt.svg" alt="youtube" />
                <img src="/images/icons/fb.svg" alt="facebook" />
                <img src="/images/icons/tw.svg" alt="twitter" />
              </div>
            </div>
            <div className={styles.contactInfo}>
              <div className={styles.info}>
                <img src="/images/services-icons/phone.svg" alt="" />
                <p>+91 223 818 30</p>
              </div>
              <div className={styles.info}>
                <img src="/images/icons/address.svg" alt="" />
                <p>
                  <Balancer>
                    15/20, Dickenson Avenue, 2nd Floor Avenue Road Cross T N
                    Shett, Avenue Road
                  </Balancer>
                </p>
              </div>
              <div className={styles.info}>
                <img src="/images/icons/email.svg" alt="" />
                <p>anilsogra125@gmail.com</p>
              </div>
            </div>
          </div>
          <form className={styles.contentBox}>
            <h3 className={styles.heading}>Send Us a Message</h3>
            <div className={styles.inputs}>
              <CustomInput bold transparent label="Name" placeholder="Name" />
              <CustomInput bold transparent label="Email" placeholder="Email" />
              <div className={styles.textareaContainer}>
                <label htmlFor="contact-textarea">Message</label>
                <textarea
                  id="contact-textarea"
                  placeholder="Message"
                ></textarea>
              </div>
              <CustomButton>Send</CustomButton>
            </div>
          </form>
        </div>
        <img className={styles.map} src="/images/address-map.png" alt="map" />
      </div>
    </div>
  );
}

export default ContactPage;
