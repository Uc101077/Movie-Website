import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import useDebounce from "../hooks/useDebounce";
import movieData from "../data/movies";
import { useLocation } from "react-router-dom";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const { setSearchQuery, watchlist } = useContext(AuthContext);

  const debouncedSearch = useDebounce(search, 400);
  const location = useLocation();

  useEffect(() => {
    setSearchQuery(debouncedSearch);
  }, [debouncedSearch, setSearchQuery]);

  // 📍 Detect Watchlist Page
  const isWatchlistPage = location.pathname === "/watchlist";

  useEffect(() => {
    setSearchQuery(debouncedSearch);
  }, [debouncedSearch, setSearchQuery]);

  useEffect(() => {
    if (!search.trim()) {
      setSuggestions([]);
      return;
    }

    const sourceData = isWatchlistPage ? watchlist : movieData;

    const matches = sourceData
      .filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
      )
      .slice(0, 5);

    setSuggestions(matches);
  }, [search, isWatchlistPage, watchlist]);

  const handleSuggestionClick = (title) => {
    setSearch(title);
    setSuggestions([]);
    setSearchQuery(title);
  };

  return (
    <>
      <div className="group">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="search-icon">
          <g>
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
          </g>
        </svg>
        <input
          className="search-input"
          type="search"
          placeholder="Search movies"
          name="searchbar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((movie) => (
              <li
                key={movie._id.$oid}
                onClick={() => handleSuggestionClick(movie.title)}
              >
                {movie.title} ({movie.year})
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Searchbar;
