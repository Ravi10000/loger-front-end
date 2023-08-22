import styles from "./property-carousel.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { properties } from "#data/properties.info";
import PropertyCard from "#components/property-card/property-card";
function PropertyCarousel() {
  const settings = {
    dots: false,
    infinite: properties.length > 4 ? true : false,
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
  };
  return (
    <div style={{ borderRadius: "20px", overflow: "hidden" }}>
      <Slider {...settings}>
        {properties.map((property) => (
          <div key={property?._id}>
            <div style={{ padding: "10px" }}>
              <PropertyCard property={property} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default PropertyCarousel;
