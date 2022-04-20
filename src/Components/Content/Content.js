import React, { useRef } from "react";
import "./Content.css";
import { FaPlayCircle } from "react-icons/fa";
import ReactPlayer from "react-player";

const Content = ({ data }) => {
  const [showPlayer, setShowPlayer] = React.useState();
  const [showModal, setShowModal] = React.useState(false);

  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  return (
    <div className="content-wrapper">
      {data &&
        data.map((item, index) => {
          return (
            <div>
              <div>
                <div
                  className="thumbnails"
                  onClick={() => {
                    setShowModal(true);
                    setShowPlayer(index + 1);
                  }}
                >
                  <img src={item.thumbnail} alt="thumbnail" />
                  <div class="play-icon">
                    <FaPlayCircle
                      fontSize="40px"
                      color="black"
                      className="play-icon"
                    />
                  </div>
                </div>
                {showModal && showPlayer === index + 1 && (
                  <div className="overlay" onClick={closeModal} ref={modalRef}>
                    <ReactPlayer
                      url={item.video}
                      playing={true}
                      width="88vw"
                      height="30vh"
                      config={{
                        youtube: {
                          playerVars: {
                            autoplay: 1,
                            controls: 1,
                          },
                        },
                      }}
                    />
                    <h1>{item.director}</h1>
                    <h1>{item.description}</h1>
                  </div>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Content;
