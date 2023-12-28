import styles from "./custom-carousel.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import PropTypes from "prop-types";
// import { RxCross1 } from "react-icons/rx";
import { useEffect } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import WithBackdrop from "#components/with-backdrop/with-backdrop";
import { MdClose } from "react-icons/md";
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  dotsClass: "slick-dots slick-thumb-md",
  customPaging: () => <></>,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

CustomCarousel.propTypes = {
  close: PropTypes.func,
  images: PropTypes.array,
};

function CustomCarousel({ close, images }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <WithBackdrop close={close}>
      <div
        className={styles.carouselContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button className={styles.closeBtn} onClick={close}>
          <span>Close</span> <MdClose />
        </button>
        <div className={styles.sliderContainer}>
          <Slider {...settings} centerMode>
            {images.map((image, idx) => {
              const imageUrl = `${
                import.meta.env.VITE_SERVER_URL
              }/images/${image}`;
              return (
                <img
                  style={{ borderRadius: "10px" }}
                  className={styles.image}
                  src={imageUrl}
                  key={idx}
                />
              );
            })}
          </Slider>
        </div>
      </div>
    </WithBackdrop>
  );
}

NextArrow.propTypes = {
  onClick: PropTypes.func,
};

export function NextArrow({ onClick }) {
  return (
    <div onClick={onClick} className={`${styles.arrow} ${styles.next}`}>
      <MdOutlineKeyboardArrowRight className={styles.icon} />
    </div>
  );
}

PrevArrow.propTypes = {
  onClick: PropTypes.func,
};
export function PrevArrow({ onClick }) {
  return (
    <div onClick={onClick} className={`${styles.arrow} ${styles.prev}`}>
      <MdOutlineKeyboardArrowRight className={styles.icon} />
    </div>
  );
}

export default CustomCarousel;
