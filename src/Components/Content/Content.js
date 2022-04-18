import React, { useState } from 'react';
import './Content.css';

import { FaPlayCircle } from 'react-icons/fa';
import ReactPlayer from 'react-player';

//slide

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/skyblue';

const Content = ({ data }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [showPlayer, setShowPlayer] = React.useState();

	console.log(data);
	return (
		<div className='content-wrapper'>
			{data &&
				data.map((item, index) => {
					return (
						<div>
							<div onClick={() => setShowPlayer(index + 1)}>
								{showPlayer === index + 1 ? (
									<div className='player-wrapper'>
										<ReactPlayer
											url={item.video}
											playing={true}
											width='88vw'
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
									</div>
								) : (
									<div>
										<div className='thumbnails mobile'>
											<img
												src={item.thumbnail.asset.url}
												alt='thumbnail'
											/>
											<div className='play-icon'>
												<FaPlayCircle
													fontSize='40px'
													color='black'
													className='play-icon'
												/>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					);
				})}
        
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
