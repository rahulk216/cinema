import React, { usefect } from 'react';
import Content from '../Content/Content';
import { display } from '../Header/Header';

const Narrative = ({ data }) => {
	const displayData = display('narrative', data);
	return <Content data={displayData} />;
};

export default Narrative;
