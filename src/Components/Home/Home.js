import React from 'react';
import Content from '../Content/Content';
import { display } from '../Header/Header';

const Home = ({ data, loader }) => {
	const displayData = display('', data);
	return <Content data={displayData} loader={loader} />;
};

export default Home;
