import React from "react";
import { FaPlayCircle } from "react-icons/fa";
import Content from "../Content/Content";
import "./HomepageSlider.css";
import { GoPlus } from "react-icons/go";
import { IoClose } from "react-icons/io5";

const HomepageSlider = ({
  data,
  showAll,
  setShowAll,
  setShowModalDesktop,
  setShowDesktopPlayer,
}) => {
  const len = data && data.length - 1;
  const Arrows = ({ prevSlide, nextSlide }) => {
    return (
      <div className="arrows">
        <span className="prev" onClick={prevSlide}>
          &#10094; 
        </span>
        <span className="next" onClick={nextSlide}>
          &#10095;
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
  }, [activeIndex, len]);

  return (
    <div className="pc">
      <div className="slider-container">
        {data?.map((item, index) => (
          <div
            key={index}
            className={index === activeIndex ? "slides active" : "inactive"}
          >
            <img
              className="slide-image"
              src={item.thumbnail.asset.url}
              alt=""
            />
            <div className="slider-text-wrapper">
              <h1 className="slider-title">{item.title}</h1>
              <div
                className="play-icon-wrapper"
                onClick={() => {
                  setShowModalDesktop(true);
                  setShowDesktopPlayer(index + 1);
                }}
              >
                <div>
                  <FaPlayCircle
                    fontSize="40px"
                    color="white"
                    className="icon-play"
                  />
                </div>
                <div>
                  <h1 className="play-icon-text">PlayVideo</h1>
                </div>
              </div>
              <div
                className="show-more-button"
                onClick={() => {
                  setShowAll(!showAll);
                  <Content ShowAll={showAll} />;
                }}
              >
                {showAll ? (
                  <>
                    <h1>Close </h1>
                    <IoClose className="close" />
                  </>
                ) : (
                  <>
                    <h1>All videos </h1>
                    <GoPlus className="plus" />
                  </>
                )}
              </div>
            </div>
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
