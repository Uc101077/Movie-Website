import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Searchbar from "../components/Searchbar";

const Navbar = () => {
  const {
    user,
    logout,
    genre,
    setGenre,
    releaseYear,
    setReleaseYear,
    genres,
    years,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <nav>
        <div className="container menu-holder">
          <ul className="nav-links">
            <li>
              <Link
                style={{
                  color: "white",
                  fontWeight: 500,
                  fontFamily: "Raleway",
                  textDecoration: "none",
                }}
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                style={{
                  color: "white",
                  fontWeight: 500,
                  fontFamily: "Raleway",
                  textDecoration: "none",
                }}
                to="/watchlist"
              >
                Watchlist
              </Link>
            </li>
          </ul>
          <Searchbar />
          {/* 🎯 FILTERS */}
          <div className="filters">
            <select className="genre-selection" value={genre} onChange={(e) => setGenre(e.target.value)}>
              {genres.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>

            <select
            className="year-selection"
              value={releaseYear}
              onChange={(e) => setReleaseYear(e.target.value)}
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div className="l-s_holder">
            {user ? (
              <>
                <span
                  style={{
                    color: "white",
                    marginRight: "5px",
                    alignContent: "center",
                  }}
                >
                  Hi, {user.name}
                </span>
                <button className="logout-btn" onClick={() => logout(navigate)}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
