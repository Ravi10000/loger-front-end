import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import styles from "./property-carousel.module.scss";
// import { properties } from "#data/properties.info";
// import PropertyCard from "#components/property-card/property-card";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import PropTypes from "prop-types";

PropertyCarousel.propTypes = {
  // items: PropTypes.array,
  // Component: PropTypes.func,
  length: PropTypes.number,
  children: PropTypes.node,
};
function PropertyCarousel({
  length,
  children,
  // items,
  // Component,
  // propertyType,
}) {
  const settings = {
    dots: false,
    infinite: length > 4 ? true : false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    draggable: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    // <div style={{ borderRadius: "20px" }}>
    <Slider {...settings}>
      {children}
      {/* {items.map((item) => (
        <div key={item?._id}>
          <div style={{ padding: "10px" }}>
            <Component item={item} propertyType={propertyType || false} />
          </div>
        </div>
      ))} */}
    </Slider>
    // </div>
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
export default PropertyCarousel;
