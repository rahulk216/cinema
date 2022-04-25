import React from 'react';
import './HomepageSlider.css';

const HomepageSlider = ({ data }) => {
	const len = data && data.length - 1;
	const Arrows = ({ prevSlide, nextSlide }) => {
		return (
			<div className='arrows'>
				<span className='prev' onClick={prevSlide}>
					&#10094; I
				</span>
				<span className='next' onClick={nextSlide}>
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
	}, [activeIndex, len]);

	return (
		<div className='pc'>
			<div className='slider-container'>
				{data?.map((item, index) => (
					<div
						key={index}
						className={
							index === activeIndex ? 'slides active' : 'inactive'
						}
					>
						<img
							className='slide-image'
							src={item.thumbnail.asset.url}
							alt=''
						/>
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
