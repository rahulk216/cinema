import React from 'react';
import './Footer.css';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import { FaVimeo } from 'react-icons/fa';
import { FaImdb } from 'react-icons/fa';

const Footer = () => {
	return (
		<footer className='footer-wrapper'>
			<a href='mailto:lalitshejwal@gmail.com'>
				<h1>contact: lalitshejwal@gmail.com</h1>
			</a>
			<hr style={{ width: '80%', margin: 'auto' }} />
			<div className='social-media'>
				<a target='_blank' href='https://www.facebook.com/lalit.shejwal.9'>
					<FaFacebook />
				</a>
				<a target='_blank' href='https://www.instagram.com/la_lit_af'>
					<FaInstagram />
				</a>
				<a target='_blank' href='https://wa.me/+917666398500'>
					<FaWhatsapp />
				</a>
				<a target='_blank' href='https://vimeo.com/user129592545'>
					<FaVimeo />
				</a>
				<a
					target='_blank'
					href='https://pro.imdb.com/name/nm13329661/?ref_=instant_nm_1&q=Lalit%20Shejwal'
				>
					<FaImdb />
				</a>
			</div>
		</footer>
	);
};

export default Footer;
