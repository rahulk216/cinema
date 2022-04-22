import React from "react";
import "./HomepageSlider.css";

const HomepageSlider = () => {
  const demo = [
    {
      title: "Fourth Slide",
      description: "This is the Fourth slider Image of our carousel",
      urls: "https://mdbootstrap.com/img/Photos/Slides/img%20(133).jpg",
    },
    {
      title: "Fifth Slide",
      description: "This is the Fifth slider Image of our carousel",
      urls: "https://mdbootstrap.com/img/Photos/Slides/img%20(147).jpg",
    },
    {
      title: "Sixth Slide",
      description: "This is the Sixth slider Image of our carousel",
      urls: "https://mdbootstrap.com/img/Photos/Slides/img%20(105).jpg",
    },
    {
      title: "Seventh Slide",
      description: "This is the Seventh slider Image of our carousel",
      urls: "https://mdbootstrap.com/img/Photos/Slides/img%20(102).jpg",
    },
  ];

  const len = demo && demo.length - 1;
  const Arrows = ({ prevSlide, nextSlide }) => {
    return (
      <div className="arrows">
        <span className="prev" onClick={prevSlide}>
          &#10094; I
        </span>
        <span className="next" onClick={nextSlide}>
          I &#10095;
        </span>
      </div>
    );
  };

  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(activeIndex === len ? 0 : activeIndex + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);
  
  return (
    <div className="pc">
      <div className="slider-container">
        {demo &&
          demo.map((item, index) => (
            <div
              key={index}
              className={index === activeIndex ? "slides active" : "inactive"}
            >
              <img className="slide-image" src={item.urls} alt="" />
            </div>
          ))}
        <Arrows
          prevSlide={() =>
            setActiveIndex(activeIndex < 1 ? len : activeIndex - 1)
          }
          nextSlide={() =>
            setActiveIndex(activeIndex === len ? 0 : activeIndex + 1)
          }
        />
      </div>
    </div>
  );
};

export default HomepageSlider;
