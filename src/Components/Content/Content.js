import React from "react";
import "./Content.css";
import { FaPlayCircle } from "react-icons/fa";
import ReactPlayer from "react-player";

const Content = ({ data }) => {
  const [showPlayer, setShowPlayer] = React.useState();

  return (
    <div className="content-wrapper">
      {data &&
        data.map((item, index) => {
          return (
            <div>
              <div onClick={() => setShowPlayer(index + 1)}>
                {showPlayer === index + 1 ? (
                  <div className="player-wrapper">
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
                  </div>
                ) : (
                  <div className="thumbnails">
                    <img src={item.thumbnail} alt="thumbnail" />
                    <div class="play-icon">
                      <FaPlayCircle
                        fontSize="40px"
                        color="black"
                        className="play-icon"
                      />
                    </div>
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
