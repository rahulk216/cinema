import React, { usefect } from 'react';
import Content from '../Content/Content';
import { display } from '../Header/Header';

const Archives = ({ data, loader }) => {
	const displayData = display('archives', data);
	return <Content data={displayData} loader={loader} />;
};

export default Archives;
