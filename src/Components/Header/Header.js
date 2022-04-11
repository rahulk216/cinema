import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import cinema_data from "../../data";
import Home from "../Home/Home";
import Commercial from "../Commercial/Commercial";
import Music from "../Music/Music";
import "./Header.css";

export const display = (category, data) => {
  if (category === "") {
    return data;
  } else {
    return data.filter((item) => item.category === category);
  }
};

const Header = () => {
  const [showMenu, setShowMenu] = React.useState(false);
  const uniqueCategory = () => {
    if (cinema_data) {
      const unique = [...new Set(cinema_data.map((x) => x.category))];
      return unique;
    }
  };
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
            {uniqueCategory().map((item, index) => {
              const route = item.replace(/ /g, "");

              return (
                <li>
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
          </ul>
        </nav>
      </div>
      <div className="menu" onClick={() => setShowMenu(!showMenu)}>
        Menu
      </div>
      <div className="name">
        <h1>LALITH SHEJWAL</h1>
        <h2>CINEMATOGRAPHER</h2>
      </div>

      <Routes>
        <Route path="/" element={<Home data={cinema_data} />} />
        <Route path="/commercial" element={<Commercial data={cinema_data} />} />
        <Route path="/music" element={<Music data={cinema_data} />} />
      </Routes>
    </div>
  );
};

export default Header;
