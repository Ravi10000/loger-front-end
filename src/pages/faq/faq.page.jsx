import styles from "./faq.page.module.scss";

import HeroContent from "#components/hero-content/hero-content";
import { Balancer } from "react-wrap-balancer";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useState } from "react";

function FaqPage() {
  let faq = {
    title: "What is Lorem Ipsum?",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500",
  };
  return (
    <div className={styles.faqPage}>
      <HeroContent
        image="/images/contact-hero.png"
        title="Frequently Asked Questions"
        subtitle="Lorem Ipsum is simply dummy text of the printing and type setting"
      />
      <div className={styles.container}>
        <div className={styles.head}>
          <div className={styles.titleContainer}>
            <h1>
              <Balancer>Frequently Asked Questions (FAQ)</Balancer>
            </h1>
            <p>
              <Balancer>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum is simply dummy text of the printing and
                typesetting industry.
              </Balancer>
            </p>
          </div>
          <p className={styles.link}>Need Help?</p>
        </div>
        <div className={styles.faqContainer}>
          <FaqItem faq={faq} />
          <FaqItem faq={faq} />
          <FaqItem faq={faq} />
          <FaqItem faq={faq} />
          <FaqItem faq={faq} />
          <FaqItem faq={faq} />
          <FaqItem faq={faq} />
        </div>
      </div>
    </div>
  );
}

function FaqItem({ faq }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className={`${styles.faqItem} ${expanded ? styles.active : ""}`}
      onClick={() => setExpanded((prevState) => !prevState)}
    >
      <div className={styles.content}>
        <h3>
          <Balancer>{faq?.title}</Balancer>
        </h3>
        {expanded && (
          <p>
            <Balancer>{faq?.description}</Balancer>
          </p>
        )}
      </div>
      <div className={styles.toggleButton}>
        {expanded ? (
          <AiOutlineMinus className={styles.icon} />
        ) : (
          <AiOutlinePlus className={styles.icon} />
        )}
      </div>
    </div>
  );
}
export default FaqPage;
