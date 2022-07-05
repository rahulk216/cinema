import React from "react";
import "./showreel.css";
import { useQuery } from "react-query";
import { FaPlayCircle } from "react-icons/fa";
import { display } from "../Header/Header";

import { AiFillCloseCircle } from "react-icons/ai";

//sanity
import sanityClient from "../../client.js";

import ReactPlayer from "react-player";

import Lottie from "react-lottie";
import * as animationData from "../../images/lf30_editor_u6zvcjey.json";

import { motion, AnimatePresence } from "framer-motion";

const getShowreel = async () => {
  return await sanityClient.fetch(`*[_type == "post"]{
    title,
		thumbnail{
			asset->{
				_id,
				url
			},
			alt
		},
		video,
		description,
		category,
		time,
		director,
		DOP,
		productions,
    editor,
    unitdp,
    ac,
    colorist
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

const Showreel = () => {
  const { data, isLoading } = useQuery("posts", getShowreel);

  const displayData = display("showreel", data);

  const [showreelPlayer, setShowreelPlayer] = React.useState();
  const [showreelModal, setShowreelModal] = React.useState(false);
  
  return (
    <div className="showreel-container">
      {isLoading ? (
        <div className="animation">
          <Lottie options={defaultOptions} height={100} width={100} />
        </div>
      ) : (
        <div className="showreel-wrapper">
          {displayData?.map((item, index) => {
            return (
              <div key={index}>
                <div
                  className="showreel-thumbnails"
                  onClick={() => {
                    setShowreelModal(true);
                    setShowreelPlayer(index + 1);
                  }}
                >
                  <img src={item.thumbnail.asset.url} alt="thumbnail" />
                  <div class="showreel-text-wrapper ">
                    <h1 className="showreel-title">{item.title}</h1>
                    <div className="showreel-icon">
                      <div>
                        <FaPlayCircle
                          fontSize="40px"
                          color="white"
                          className="icon-showreel"
                        />
                      </div>
                      <div>
                        <h1 className="showreel-icon-text">PlayVideo</h1>
                      </div>
                    </div>
                  </div>
                </div>
                {showreelModal && showreelPlayer === index + 1 && (
                  <>
                    <div className="showreel-modal">
                      <div
                        className="close-btn-desktop"
                        onClick={() => setShowreelModal(false)}
                      >
                        <AiFillCloseCircle color="white" fontSize="35px" />
                      </div>
                      <div className="showreel-modal-wrapper">
                        {item.video ? (
                          <ReactPlayer
                            url={item.video}
                            playing={true}
                            width="190%"
                            height="100%"
                            controls={true}
                            config={{
                              youtube: {
                                playerVars: {
                                  autoplay: 1,
                                  controls: 1,
                                },
                              },
                            }}
                          />
                        ) : (
                          <img
                            src="https://images.unsplash.com/photo-1650374471470-a46867a3ce06?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyM3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                            alt="fallback"
                            className="fallbackImage"
                          ></img>
                        )}

                        <div className="cinema_content-desktop">
                          {item.title && <p className="title">{item.title}</p>}
                          {item.time && (
                            <span className="time">{item.time}</span>
                          )}
                          {item.description && (
                            <p className="description">{item.description}</p>
                          )}
                          <div className="cinema_work">
                            {item.director && (
                              <div className="item">
                                <p>
                                  <strong>Director</strong>:{"       "}
                                  {item.director}
                                </p>
                              </div>
                            )}
                            {item.DOP && (
                              <div className="item">
                                <p>
                                  <strong>DOP</strong>:{"       "}
                                  {item.DOP}
                                </p>
                              </div>
                            )}
                            {item.productions && (
                              <div className="item">
                                <p>
                                  <strong>Production</strong>:{"       "}
                                  {item.productions}
                                </p>
                              </div>
                            )}
                            {item.unitdp && (
                                    <div className="item">
                                      <p>
                                        <strong>2nd Unit DP</strong>:{"       "}
                                        {item.unitdp}
                                      </p>
                                    </div>
                                  )}
                                  {item.ac && (
                                    <div className="item">
                                      <p>
                                        <strong>1st AC</strong>:{"       "}
                                        {item.ac}
                                      </p>
                                    </div>
                                  )}
                                  {item.colorist && (
                                    <div className="item">
                                      <p>
                                        <strong>Colorist</strong>:{"       "}
                                        {item.colorist}
                                      </p>
                                    </div>
                                  )}
                                  {item.editor && (
                                    <div className="item">
                                      <p>
                                        <strong>Editor</strong>:{"       "}
                                        {item.editor}
                                      </p>
                                    </div>
                                  )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <AnimatePresence>
                      <>
                        <motion.div
                          initial={{
                            opacity: 0,
                          }}
                          animate={{
                            opacity: 1,
                            transition: {
                              duration: 0.3,
                            },
                          }}
                          exit={{
                            opacity: 0,
                            transition: {
                              delay: 0.3,
                            },
                          }}
                          className="overlay"
                        >
                          <div
                            className="close-btn"
                            onClick={() => setShowreelModal(false)}
                          >
                            <AiFillCloseCircle color="white" fontSize="35px" />
                          </div>
                          <motion.div
                            initial={{
                              scale: 0,
                            }}
                            animate={{
                              scale: 1,
                              transition: {
                                duration: 0.3,
                              },
                            }}
                            exit={{
                              scale: 0,
                              transition: {
                                delay: 0.3,
                              },
                            }}
                            className="overlay-wrapper"
                          >
                            {item.video ? (
                              <ReactPlayer
                                url={item.video}
                                playing={true}
                                controls={true}
                                width="88.2vw"
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
                            ) : (
                              <img
                                src="https://images.unsplash.com/photo-1650374471470-a46867a3ce06?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyM3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                                alt="fallback"
                                className="fallbackImage"
                              ></img>
                            )}
                            <div className="cinema_content">
                              {item.title && (
                                <p className="title">{item.title}</p>
                              )}
                              <div className="time-wrapper">
                                {item.time && (
                                  <span className="time">{item.time}</span>
                                )}
                              </div>
                              {item.description && (
                                <p className="description">
                                  {item.description}
                                </p>
                              )}
                              <div className="cinema_work">
                                {item.director && (
                                  <div className="item">
                                    <p>
                                      <strong>Director</strong>:{"       "}
                                      {item.director}
                                    </p>
                                  </div>
                                )}
                                {item.DOP && (
                                  <div className="item">
                                    <p>
                                      <strong>DOP</strong>:{"       "}
                                      {item.DOP}
                                    </p>
                                  </div>
                                )}
                                {item.productions && (
                                  <div className="item">
                                    <p>
                                      <strong>Production</strong>:{"       "}
                                      {item.productions}
                                    </p>
                                  </div>
                                )}
                                {item.unitdp && (
                                    <div className="item">
                                      <p>
                                        <strong>2nd Unit DP</strong>:{"       "}
                                        {item.unitdp}
                                      </p>
                                    </div>
                                  )}
                                  {item.ac && (
                                    <div className="item">
                                      <p>
                                        <strong>1st AC</strong>:{"       "}
                                        {item.ac}
                                      </p>
                                    </div>
                                  )}
                                  {item.colorist && (
                                    <div className="item">
                                      <p>
                                        <strong>Colorist</strong>:{"       "}
                                        {item.colorist}
                                      </p>
                                    </div>
                                  )}
                                  {item.editor && (
                                    <div className="item">
                                      <p>
                                        <strong>Editor</strong>:{"       "}
                                        {item.editor}
                                      </p>
                                    </div>
                                  )}
                              </div>
                              <div
                                style={{
                                  marginBottom: "8rem",
                                }}
                              />
                            </div>
                          </motion.div>
                        </motion.div>
                      </>
                    </AnimatePresence>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Showreel;
