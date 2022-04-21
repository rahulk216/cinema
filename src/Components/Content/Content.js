import React, { useRef } from 'react';
import './Content.css';
import { FaPlayCircle } from 'react-icons/fa';
import ReactPlayer from 'react-player';

//slide

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/skyblue';

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
		<div className='content-wrapper'>
			{data &&
				data.map((item, index) => {
					return (
						<div>
							<div>
								<div
									className='thumbnails'
									onClick={() => {
										setShowModal(true);
										setShowPlayer(index + 1);
									}}
								>
									<img
										src={item.thumbnail.asset.url}
										alt='thumbnail'
									/>
									<div class='play-icon'>
										<FaPlayCircle
											fontSize='40px'
											color='black'
											className='play-icon'
										/>
									</div>
								</div>
								{showModal && showPlayer === index + 1 && (
									<div
										className='overlay'
										onClick={closeModal}
										ref={modalRef}
									>
										<div className='overlay-wrapper'>
											{item.video ? (
												<ReactPlayer
													url={item.video}
													playing={true}
													width='88.2vw'
													height='30vh'
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
													src='https://images.unsplash.com/photo-1650374471470-a46867a3ce06?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyM3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'
													alt='fallback'
													className='fallbackImage'
												></img>
											)}
											{item.title && (
												<h1 className='title'>{item.title}</h1>
											)}
											{item.time && <p>{item.time}</p>}
											<div className='details'>
												{item.director && (
													<h1>{`Director: ${item.director}`}</h1>
												)}
												{item.DOP && <h1>{`DOP: ${item.DOP}`}</h1>}
												{item.productions && (
													<h1>{`Production: ${item.productions}`}</h1>
												)}
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					);
				})}
			<div style={{ marginBottom: '8rem' }} />
			<div className='pc'>
				<Splide>
					{data &&
						data.map((item, index) => (
							<div>
								<SplideSlide>
									<img
										src={item.thumbnail.asset.url}
										alt='thumbnail'
										className='slider-img'
									/>
									<div className='play-icon'>
										<FaPlayCircle
											fontSize='40px'
											color='black'
											className='play-icon'
										/>
									</div>
								</SplideSlide>
							</div>
						))}
				</Splide>
			</div>
		</div>
	);
};

export default Content;
