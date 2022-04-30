import React, { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";

import Home from "../Home/Home";
import Commercial from "../Commercial/Commercial";
import Music from "../Music/Music";
import About from "../About/About";
import Narrative from "../Narrative/Narrative";
import Archives from "../Archives/Archives";
import Showreel from "../Showreel/Showreel";

import "./Header.css";
import { useQuery } from "react-query";
//sanity
import sanityClient from "../../client.js";
import Stills from "../Stills/Stills";

export const display = (category, data) => {
  if (category === "") {
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
  const category = ["commercial", "music", "narrative", "archives"];
  const { data, isLoading } = useQuery("posts", getCinemas);
  console.log(isLoading);

  const [showMenu, setShowMenu] = useState(false);

  const menuOptions = `menuOpt ${showMenu ? "start" : ""}`;

  return (
    <div className="header-wrapper">
      <div className={menuOptions}>
        <nav>
          <ul className="nav-list">
            <li>
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  color: isActive ? "#ffff" : "#a0a09f",
                })}
                onClick={() => setShowMenu(false)}
              >
                HOME
              </NavLink>
            </li>
            {category.map((item, index) => {
              const route = item.replace(/ /g, "");

              return (
                <li key={index}>
                  <NavLink
                    to={`/${route}`}
                    style={({ isActive }) => ({
                      color: isActive ? "#ffff" : "#a0a09f",
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
                to="/showreel"
                style={({ isActive }) => ({
                  color: isActive ? "#ffff" : "#a0a09f",
                })}
                onClick={() => setShowMenu(false)}
              >
                SHOWREEL
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/stills"
                style={({ isActive }) => ({
                  color: isActive ? "#ffff" : "#a0a09f",
                })}
                onClick={() => setShowMenu(false)}
              >
                STILLS
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                style={({ isActive }) => ({
                  color: isActive ? "#ffff" : "#a0a09f",
                })}
                onClick={() => setShowMenu(false)}
              >
                ABOUT
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="menu" onClick={() => setShowMenu(!showMenu)}>
        Menu
      </div>
      <div className="name">
        <h1>LALIT SHEJWAL</h1>
        <h2>CINEMATOGRAPHER</h2>
      </div>

      <Routes>
        <Route path="/" element={<Home data={data} loader={isLoading} />} />
        <Route
          path="/commercial"
          element={<Commercial data={data} loader={isLoading} />}
        />
        <Route
          path="/music"
          element={<Music data={data} loader={isLoading} />}
        />
        <Route
          path="/narrative"
          element={<Narrative data={data} loader={isLoading} />}
        />
        <Route
          path="/archives"
          element={<Archives data={data} loader={isLoading} />}
        />
        <Route
          path="/stills"
          element={<Stills data={data} loader={isLoading} />}
        />
        <Route
          path="/showreel"
          element={<Showreel data={data} loader={isLoading} />}
        />

        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default Header;
