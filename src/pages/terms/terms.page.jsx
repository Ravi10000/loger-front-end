import HeroContent from "#components/hero-content/hero-content";
import styles from "./terms.page.module.scss";
function TermsPage() {
  return (
    <div className={styles.termsPage}>
      <HeroContent
        title="Terms & Conditions"
        subtitle="Lorem Ipsum is simply dummy text of the printing and type setting"
        image="/images/contact-hero.png"
      />
    </div>
  );
}

export default TermsPage;
