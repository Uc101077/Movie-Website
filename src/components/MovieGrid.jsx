import React, { useContext, useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import movieData from "../data/movies";
import Pagination from "./Pagination";
import { AuthContext } from "../context/AuthContext";
import filterMovies from '../utils/filterMovies'

const MovieGrid = () => {
  const { searchQuery, genre, releaseYear } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredMovies = filterMovies(
  movieData,
  searchQuery,
  genre,
  releaseYear
);

  const moviesPerPage = 12;
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <>
      <div className="movies-grid">
        {currentMovies.length > 0 ? (
          currentMovies.map((movie) => (
            <MovieCard key={movie._id.$oid} movie={movie} />
          ))
        ) : (
          <h2 style={{ color: "white" }}>No movies found</h2>
        )}
      </div>
      {filteredMovies.length > moviesPerPage && (
        <Pagination
          totalMovies={filteredMovies.length}
          moviesPerPage={moviesPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
};

export default MovieGrid;
