import styles from "./privacy-policy.page.module.scss";
import HeroContent from "#components/hero-content/hero-content";
function PrivacyPolicyPage() {
  return (
    <div className={styles.privacyPolicyPage}>
      <HeroContent
        title="Privacy Policy"
        subtitle="Lorem Ipsum is simply dummy text of the printing and type setting"
        image="/images/contact-hero.png"
      />
    </div>
  );
}

export default PrivacyPolicyPage;
