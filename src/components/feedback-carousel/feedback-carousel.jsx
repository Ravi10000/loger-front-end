import styles from "./feedback-carousel.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function FeedbackCarousel({ items, Component }) {
  const settings = {
    dots: true,
    appendDots: (dots) => (
      <div
        className="dots-container"
        style={{
          width: "100%",
          display: "flex",
          height: "10px",
          overflowY: "hidden",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "80%" }}>{dots}</div>
      </div>
    ),
    dotsClass: "slick-dots slick-thumb",
    infinite: items.length > 4 ? true : false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: true,
    draggable: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    // <div style={{ borderRadius: "20px" }}>
    <Slider {...settings}>
      {items.map((item) => (
        <div key={item?._id}>
          <div
            style={{
              padding: "10px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Component item={item} />
          </div>
        </div>
      ))}
    </Slider>
    // </div>
  );
}

export default FeedbackCarousel;
