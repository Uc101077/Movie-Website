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
      <h2
        style={{
          color: "white",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          fontFamily: 'Raleway", sans-serif',
        }}
      >
        Your watchlist is empty
      </h2>
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
