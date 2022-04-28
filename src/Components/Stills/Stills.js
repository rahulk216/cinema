import React from "react";
import "./Stills.css";
import { useQuery } from "react-query";
import { AiFillCloseCircle } from "react-icons/ai";

//splide
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

//sanity
import sanityClient from "../../client.js";

import Lottie from "react-lottie";
import * as animationData from "../../images/lf30_editor_u6zvcjey.json";

const getStills = async () => {
  return await sanityClient.fetch(`*[_type == "stills"]{
		title,
		thumbnail{
			asset->{
				_id,
				url
			},
			alt
		},
	}`);
};

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Stills = () => {
  const { data, isLoading } = useQuery("stills", getStills);

  const [carousel, setCarousel] = React.useState(false);
  const [carouselImage, setcarouselImage] = React.useState(0);

  const dummy = (currentIndex) => {
    const newData = data.slice(currentIndex, data.length);
    const secondData = data.slice(0, currentIndex);
    const demo = [...newData, ...secondData];
    return demo;
  };

  return (
    <div className="container">
      {isLoading ? (
        <div className="animation">
          <Lottie options={defaultOptions} height={100} width={100} />
        </div>
      ) : (
        <div>
          {!carousel && (
            <>
              <div className="stills-grid-container">
                {data?.map((item, index) => (
                  <div
                    key={index}
                    className="stills-grid-item"
                    onClick={() => {
                      setCarousel(true);
                      setcarouselImage(index);
                    }}
                  >
                    <div className="hover-overlay">
                      <h2>{item.title}</h2>
                    </div>
                    <img src={item.thumbnail.asset.url} alt={item.title} />
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: "8rem" }} />
            </>
          )}

          {carousel && (
            <div>
              <div
                className="splide-wrapper-mobile"
                onClick={() => setCarousel(false)}
              >
                <Splide
                  options={{
                    arrows: false,
                    pagination: false,
                  }}
                  aria-label="My Favorite Images"
                >
                  {dummy(carouselImage)?.map((item, index) => (
                    <SplideSlide>
                      <img
                        className="splide-image"
                        src={item.thumbnail.asset.url}
                        alt="thumb"
                      />
                    </SplideSlide>
                  ))}
                </Splide>
              </div>

              <div className="splide-wrapper-desktop">
                <Splide
                  aria-label="My Favorite Images"
                  options={{
                    pagination: false,
                    autoplay: true,
                    loop: true,
                  }}
                >
                  {dummy(carouselImage)?.map((item, index) => (
                    <SplideSlide>
                      <img src={item.thumbnail.asset.url} alt="thumb" />
                    </SplideSlide>
                  ))}
                </Splide>
                <div
                  className="close-button"
                  onClick={() => setCarousel(false)}
                >
                  <AiFillCloseCircle color="white" fontSize="35px" />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Stills;
