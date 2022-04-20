import React, { useEffect, useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import cinema_data from '../../data';
import Home from '../Home/Home';
import Commercial from '../Commercial/Commercial';
import Music from '../Music/Music';
import About from '../About/About';
import './Header.css';
import { useQuery } from 'react-query';
//sanity
import sanityClient from '../../client.js';

export const display = (category, data) => {
	if (category === '') {
		return data;
	} else {
		return data?.filter((item) => item.category === category);
	}
};

const getCinemas = async () => {
	return await sanityClient.fetch(`*[_type == "post"]{
		title,
		thumbnail{
			asset->{
				_id,
				url
			},
			alt
		},
		video,
		description,
		category,
		time,
		director,
		DOP,
		productions
	}`);
};

const Header = () => {
	const [post, setPost] = useState(null);
	console.log(post);

	const { error, data, isLoading } = useQuery('posts', getCinemas);

	const [showMenu, setShowMenu] = useState(false);
	const uniqueCategory = () => {
		if (cinema_data) {
			const unique = [...new Set(cinema_data.map((x) => x.category))];
			return unique;
		}
	};
	const menuOptions = `menuOpt ${showMenu ? 'start' : ''}`;

	// const getPosts = async () => {
	// 	const temp = await sanityClient.fetch(`*[_type == "post"]{
	// 		title,
	// 		thumbnail{
	// 			asset->{
	// 				_id,
	// 				url
	// 			},
	// 			alt
	// 		},
	// 		video,
	// 		description,
	// 		category,
	// 		time,
	// 		director,
	// 		DOP,
	// 		productions
	// 	}`);
	// 	setPost(temp);
	// };

	//sanity connecting
	// useEffect(() => {
	// 	getPosts();
	// }, []);

	return (
		<div className='header-wrapper'>
			<div className={menuOptions}>
				<nav>
					<ul className='nav-list'>
						<li>
							<NavLink
								to='/'
								style={({ isActive }) => ({
									color: isActive ? '#ffff' : '#a0a09f',
								})}
								onClick={() => setShowMenu(false)}
							>
								HOME
							</NavLink>
						</li>
						{uniqueCategory().map((item, index) => {
							const route = item.replace(/ /g, '');

							return (
								<li>
									<NavLink
										to={`/${route}`}
										style={({ isActive }) => ({
											color: isActive ? '#ffff' : '#a0a09f',
										})}
										onClick={() => setShowMenu(false)}
									>
										{item.toUpperCase()}
									</NavLink>
								</li>
							);
						})}
						<li>
							<NavLink
								to='/about'
								style={({ isActive }) => ({
									color: isActive ? '#ffff' : '#a0a09f',
								})}
								onClick={() => setShowMenu(false)}
							>
								ABOUT
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
			<div className='menu' onClick={() => setShowMenu(!showMenu)}>
				Menu
			</div>
			<div className='name'>
				<h1>LALITH SHEJWAL</h1>
				<h2>CINEMATOGRAPHER</h2>
			</div>

			<Routes>
				<Route path='/' element={<Home data={data} />} />
				<Route path='/commercial' element={<Commercial data={data} />} />
				<Route path='/music' element={<Music data={data} />} />
				<Route path='/about' element={<About />} />
			</Routes>
		</div>
	);
};

export default Header;
