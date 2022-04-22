import React, { useRef } from 'react';
import './Content.css';
import { FaPlayCircle } from 'react-icons/fa';
import ReactPlayer from 'react-player';
import Lottie from 'react-lottie';
import * as animationData from '../../images/lf30_editor_u6zvcjey.json';

import HomepageSlider from "../HomepageSlider/HomepageSlider";

import { AiFillCloseCircle } from "react-icons/ai";

import { motion, AnimatePresence } from "framer-motion";

const Content = ({ data, loader }) => {
  const [showPlayer, setShowPlayer] = React.useState();
  const [showModal, setShowModal] = React.useState(false);

  const modalRef = useRef();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };


  const closeModal = (e) => {
		if (modalRef.current === e.target) {
			setShowModal(false);
		}
	};

  return (
    <div>
    {loader ? (
				<div className='animation'>
					<Lottie options={defaultOptions} height={100} width={100} />
				</div>
			) : (
        <div>
    <div className="content-wrapper">
      <HomepageSlider />
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
                  <img src={item.thumbnail.asset.url} alt="thumbnail" />
                  <div class="play-icon">
                    <FaPlayCircle
                      fontSize="40px"
                      color="black"
                      className="play-icon"
                    />
                  </div>
                </div>
                <AnimatePresence>
                  {showModal && showPlayer === index + 1 && (
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
                        onClick={closeModal}
                        ref={modalRef}
                        className="overlay"
                      >
                        <div
                          className="close-btn"
                          onClick={() => setShowModal(false)}
                        >
                          <AiFillCloseCircle color="black" fontSize="35px" />
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
                          {item.title && (
                            <h1 className="title">{item.title}</h1>
                          )}
                          {item.time && <p className="time">{item.time}</p>}
                          <div className="details">
                            {item.director && (
                              <h1>{`Director: ${item.director}`}</h1>
                            )}
                            {item.DOP && <h1>{`DOP: ${item.DOP}`}</h1>}
                            {item.productions && (
                              <h1>{`Production: ${item.productions}`}</h1>
                            )}
                          </div>
                        </motion.div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
        <div style={{ marginBottom: '8rem' }} />
    </div>
    </div>
      )}
    </div>
  );
};

export default Content;
