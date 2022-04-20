import React,{usefect} from 'react';
import Content from '../Content/Content';
import { display } from '../Header/Header';

const Commercial = ({ data }) => {

	const displayData = display('commercial', data);
	return <Content data={displayData} />;
};

export default Commercial;
