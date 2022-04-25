import React from 'react';
import './archives.css';
import { useQuery } from 'react-query';
//sanity
import sanityClient from '../../client.js';

import Lottie from 'react-lottie';
import * as animationData from '../../images/lf30_editor_u6zvcjey.json';

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
		preserveAspectRatio: 'xMidYMid slice',
	},
};

const Archives = () => {
	const {  data, isLoading } = useQuery('stills', getStills);
	console.log(isLoading);
	console.log(data);
	return (
		<div className='container'>
			{isLoading ? (
				<div className='animation'>
					<Lottie options={defaultOptions} height={100} width={100} />
				</div>
			) : (
				<div>
					<div className='stills-grid-container'>
						{data?.map((item, index) => (
							<div key={index} className='stills-grid-item'>
								<div className='hover-overlay'>
									<h2>{item.title}</h2>
								</div>
								<img src={item.thumbnail.asset.url} alt={item.title} />
							</div>
						))}
					</div>
					<div style={{ marginBottom: '8rem' }} />
				</div>
			)}
		</div>
	);
};

export default Archives;
