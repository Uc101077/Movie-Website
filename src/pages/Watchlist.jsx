import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";
import filterMovies from "../utils/filterMovies";

const Watchlist = () => {
  const {
    watchlist,
    searchQuery,
    genre,
    releaseYear,
    setReleaseYear,
    setGenre,
  } = useContext(AuthContext);

  const filteredWatchlist = filterMovies(
    watchlist,
    searchQuery,
    genre,
    releaseYear
  );

  useEffect(() => {
    return () => {
      setGenre("Genre");
      setReleaseYear("Year");
    };
  }, []);

  if (watchlist.length === 0) {
    return (
      <h2 className="no-watchlist-items"
      >
        Your watchlist is empty
      </h2>
    );
  }

  if (filteredWatchlist.length === 0) {
    return (
      <>
        <Navbar />
        <h2 className="search_not_watchlist"
        >
          Movie not available in watchlist
        </h2>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="movies-grid">
        {filteredWatchlist.map((movie) => (
          <div key={movie._id.$oid}>
            <MovieCard movie={movie} isWatchlist={true} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Watchlist;
