import React from 'react';
import Content from '../Content/Content';
import { display } from '../Header/Header';

const Narrative = ({ data, loader }) => {
	const displayData = display('narrative', data);
	return <Content data={displayData} loader={loader} />;
};

export default Narrative;
