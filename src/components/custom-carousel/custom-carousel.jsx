import styles from "./custom-carousel.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { RxCross1 } from "react-icons/rx";
import { useEffect } from "react";
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

CustomCarousel.propTypes = {
  close: PropTypes.func,
  images: PropTypes.array,
};

function CustomCarousel({ close, images }) {
  console.log({ images });
  console.log(`${import.meta.env.VITE_SERVER_URL}/images/${images[0]}`);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className={styles.carouselContainer}>
      <button className={styles.closeBtn} onClick={close}>
        <RxCross1 />
      </button>
      <div className={styles.sliderContainer}>
        <Slider {...settings} centerMode>
          {/* {images.map((image, idx) => {
            const imageUrl = `${
              import.meta.env.VITE_SERVER_URL
            }/images/${image}`;
            console.log({ imageUrl });
            return (
              <div
                key={idx}
                className={styles.imageContainer}
                style={{
                  backgroundImage: `url("http://192.168.29.91:5000/images/1702614622195-pexels-pixabay-261102.jpg")`,
                }}
              ></div>
            );
          })} */}
          {images.map((image, idx) => {
            const imageUrl = `${
              import.meta.env.VITE_SERVER_URL
            }/images/${image}`;
            return <img className={styles.image} src={imageUrl} key={idx} />;
          })}
        </Slider>
      </div>
    </div>
  );
}

export default CustomCarousel;
