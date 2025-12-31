import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Searchbar from "../components/Searchbar";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const {
    user,
    logout,
    genre,
    setGenre,
    releaseYear,
    setReleaseYear,
    genres,
    years,
    theme,
    toggleTheme,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <nav>
        <div className="container menu-holder">
          <ul className="nav-links">
            <li>
              <Link className="links" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="links" to="/watchlist">
                Watchlist
              </Link>
            </li>
          </ul>
          <Searchbar />
          <div className="filters">
            <select
              className="genre-selection"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
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
            <div className="nav-controls">
              <label className="switch">
                <input
                  id="input"
                  type="checkbox"
                  checked={theme === "dark"}
                  onChange={toggleTheme}
                />
                <div className="slider round">
                  <div className="sun-moon">
                    <svg
                      id="moon-dot-1"
                      className="moon-dot"
                      viewBox="0 0 100 100"
                    >
                      <circle cx={50} cy={50} r={50} />
                    </svg>
                    <svg
                      id="moon-dot-2"
                      className="moon-dot"
                      viewBox="0 0 100 100"
                    >
                      <circle cx={50} cy={50} r={50} />
                    </svg>
                    <svg
                      id="moon-dot-3"
                      className="moon-dot"
                      viewBox="0 0 100 100"
                    >
                      <circle cx={50} cy={50} r={50} />
                    </svg>
                    <svg
                      id="light-ray-1"
                      className="light-ray"
                      viewBox="0 0 100 100"
                    >
                      <circle cx={50} cy={50} r={50} />
                    </svg>
                    <svg
                      id="light-ray-2"
                      className="light-ray"
                      viewBox="0 0 100 100"
                    >
                      <circle cx={50} cy={50} r={50} />
                    </svg>
                    <svg
                      id="light-ray-3"
                      className="light-ray"
                      viewBox="0 0 100 100"
                    >
                      <circle cx={50} cy={50} r={50} />
                    </svg>
                    <svg
                      id="cloud-1"
                      className="cloud-dark"
                      viewBox="0 0 100 100"
                    >
                      <circle cx={50} cy={50} r={50} />
                    </svg>
                    <svg
                      id="cloud-2"
                      className="cloud-dark"
                      viewBox="0 0 100 100"
                    >
                      <circle cx={50} cy={50} r={50} />
                    </svg>
                    <svg
                      id="cloud-3"
                      className="cloud-dark"
                      viewBox="0 0 100 100"
                    >
                      <circle cx={50} cy={50} r={50} />
                    </svg>
                    <svg
                      id="cloud-4"
                      className="cloud-light"
                      viewBox="0 0 100 100"
                    >
                      <circle cx={50} cy={50} r={50} />
                    </svg>
                    <svg
                      id="cloud-5"
                      className="cloud-light"
                      viewBox="0 0 100 100"
                    >
                      <circle cx={50} cy={50} r={50} />
                    </svg>
                    <svg
                      id="cloud-6"
                      className="cloud-light"
                      viewBox="0 0 100 100"
                    >
                      <circle cx={50} cy={50} r={50} />
                    </svg>
                  </div>
                  <div className="stars">
                    <svg id="star-1" className="star" viewBox="0 0 20 20">
                      <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
                    </svg>
                    <svg id="star-2" className="star" viewBox="0 0 20 20">
                      <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
                    </svg>
                    <svg id="star-3" className="star" viewBox="0 0 20 20">
                      <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
                    </svg>
                    <svg id="star-4" className="star" viewBox="0 0 20 20">
                      <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
                    </svg>
                  </div>
                </div>
              </label>
            </div>
            {user ? (
              <>
                <div className="profile-wrapper">
                  <button
                    className="profile-btn"
                    onClick={() => setProfileOpen((prev) => !prev)}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </button>
                  <ProfileMenu
                    open={profileOpen}
                    setOpen={setProfileOpen}
                    user={user}
                    logout={logout}
                    navigate={navigate}
                  />
                </div>
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
