import React from 'react';
import './Footer.css';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import { FaVimeo } from 'react-icons/fa';


const Footer = () => {
	return (
		<footer className='footer-wrapper'>
			<h1>contact: lalith@gmail.com</h1>
			<hr />
			<div className='social-media'>
				<FaFacebook />
				<FaInstagram />
				<FaWhatsapp />
				<FaVimeo/>
			</div>
		</footer>
	);
};

export default Footer;
