import React from 'react';
import Content from '../Content/Content';
import { display } from '../Header/Header';

const Commercial = ({ data, loader }) => {
	const displayData = display('commercial', data);

	return <Content data={displayData} loader={loader} />;
};

export default Commercial;
