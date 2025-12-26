import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import movieData from "../data/movies";
import { AuthContext } from "../context/AuthContext";

const MovieDetail = () => {
  const { id } = useParams();

  const { watchlist, addToWatchlist, removeFromWatchlist } =
    useContext(AuthContext);

  const movie = movieData.find((m) => m._id.$oid === id);

  if (!movie)
    return (
      <h2 style={{ color: "white", textAlign: "center" }}>No Details Found</h2>
    );

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const isInWatchlist =
    watchlist.filter((m) => m._id?.$oid === movie._id?.$oid).length > 0;

  return (
    <div className="movie-detail-main">
      <div className="movie-detail-wrapper">
        <div className="content-section">
          <h1 className="movie-title">{movie.title}</h1>
          <p className="movie-description">{movie.description}</p>
          <div className="movie-meta">
            <span className="imdb-rating">IMDb {movie.rating}</span>
            <span>{formatDuration(movie.duration)}</span>
            <span>{movie.year}</span>
            <span className="meta-badge">X-RAY</span>
            <span className="meta-badge">U/A 16+</span>
            <span className="meta-badge">AD</span>
          </div>
          <div className="genre-section">
            <span>
              <strong>{movie.genre[0] || null}</strong>
            </span>
            <span>
              <strong>{movie.genre[1] || null}</strong>
            </span>
            <span>
              <strong>{movie.genre[2] || null}</strong>
            </span>
            <span>
              <strong>{movie.genre[3] || null}</strong>
            </span>
          </div>

          <div className="action-buttons">
            <button className="btn-primary">Watch with Prime</button>
            {isInWatchlist ? (
              <button
                className="btn-primary"
                onClick={() => removeFromWatchlist(movie._id.$oid)}
              >
                Remove from Watchlist
              </button>
            ) : (
              <button
                className="btn-primary"
                onClick={() => addToWatchlist(movie)}
              >
                Add to Watchlist
              </button>
            )}
          </div>

          <div className="membership-note">
            <span>👑</span>
            <span>Watch with a Premium Membership</span>
          </div>

          <p className="rental-info">
            Rentals include 30 days to start watching this video and 48 hours to
            finish once started.
          </p>
        </div>

        <div className="poster-section">
          <img src={movie.poster} alt={movie.title} className="movie-poster" />
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
