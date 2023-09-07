import styles from "./work.page.module.scss";

import { Balancer } from "react-wrap-balancer";
import { BsPlayFill } from "react-icons/bs";
import HeroContent from "#components/hero-content/hero-content";

function WorkPage() {
  return (
    <div className={styles.workPage}>
      <HeroContent
        image="/images/contact-hero.png"
        title="How to Work"
        subtitle="Lorem Ipsum is simply dummy text of the printing and type setting"
      />
      <div className={styles.container}>
        <h2>How to Work</h2>
        <div className={styles.contentContainer}>
          <div className={styles.text}>
            <h3>Lorem Ipsum is simply dummy text</h3>
            <p>
              <Balancer>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing
                and typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also
                the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker
                including versions of Lorem Ipsum. Lorem Ipsum is simply dummy
                text of the printing and typesetting industry. Lorem Ipsum has
                been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it
                to make a type specimen book. It has survived not only five
                centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged. It was popularised
              </Balancer>
            </p>
            <ul>
              <li>
                Lorem Ipsum is simply dummy text of the printing and type
                setting industry.{" "}
              </li>
              <li>
                Lorem Ipsum is simply dummy text of the printing and type
                setting industry.{" "}
              </li>
              <li>
                Lorem Ipsum is simply dummy text of the printing and type
                setting industry.{" "}
              </li>
              <li>
                Lorem Ipsum is simply dummy text of the printing and type
                setting industry.{" "}
              </li>
              <li>
                Lorem Ipsum is simply dummy text of the printing and type
                setting industry.{" "}
              </li>
              <li>
                Lorem Ipsum is simply dummy text of the printing and type
                setting industry.{" "}
              </li>
            </ul>
          </div>
          <div className={styles.imageContainer}>
            <BsPlayFill className={styles.icon} />
          </div>
        </div>
        <h3>Lorem Ipsum is simply dummy text</h3>
        <p>
          <Balancer>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s,
            <br />
            <br />
            when an unknown printer took a galley of type and scrambled it to
            make a type specimen book. It has survived not only five centuries,
            but also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised
          </Balancer>
        </p>
        <p>
          <Balancer>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries,
            <br />
            <br />
            but also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s,
            <br />
            <br />
            when an unknown printer took a galley of type and scrambled it to
            make a type specimen book. It has survived not only five centuries,
            but also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s,
            <br />
            <br />
            when an unknown printer took a galley of type and scrambled it to
            make a type specimen book. It has survived not only five centuries,
            but also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised
          </Balancer>
        </p>
        <ul>
          <li>
            Lorem Ipsum is simply dummy text of the printing and type setting
            industry.{" "}
          </li>
          <li>
            Lorem Ipsum is simply dummy text of the printing and type setting
            industry.{" "}
          </li>
          <li>
            Lorem Ipsum is simply dummy text of the printing and type setting
            industry.{" "}
          </li>
          <li>
            Lorem Ipsum is simply dummy text of the printing and type setting
            industry.{" "}
          </li>
          <li>
            Lorem Ipsum is simply dummy text of the printing and type setting
            industry.{" "}
          </li>
          <li>
            Lorem Ipsum is simply dummy text of the printing and type setting
            industry.{" "}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default WorkPage;
