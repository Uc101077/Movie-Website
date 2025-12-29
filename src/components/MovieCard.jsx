import React, { useContext } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie, isWatchlist }) => {
  const { watchlist, addToWatchlist, removeFromWatchlist } =
    useContext(AuthContext);

  const isAdded = watchlist.some((m) => m._id.$oid === movie._id.$oid);
  const navigate = useNavigate();

  const renderStars = (rating) => {
    const stars = [];
    const starRating = rating / 2;
    const fullStars = Math.floor(starRating);
    const halfStar = starRating - fullStars >= 0.5;

    for (let i = 0; i < fullStars; i++) stars.push(<FaStar key={i} />);
    if (halfStar) stars.push(<FaStarHalfAlt key="half" />);
    while (stars.length < 5) stars.push(<FaRegStar key={stars.length} />);

    return stars;
  };

  return (
    <>
      <div className="card">
        <img src={movie.poster} alt="movie-poster" className="card_image" />
        <div className="card-info">
          <div className="details-container">
            <span className="card_category">
              {movie.rating}/10
              <span className="rating-stars">{renderStars(movie.rating)}</span>
            </span>
            <span className="releaseTime">{movie.year}</span>
          </div>
          <h2 className="card_title">{movie.title}</h2>
          <div className="button-container">
            <button
              className="play-btn"
              onClick={() => navigate(`/movies/${movie._id.$oid}`)}
            >
              Watch Now
            </button>
            
            {!isWatchlist && (
              <button
                className="watchlist-btn"
                onClick={() => addToWatchlist(movie)}
                disabled={isAdded}
              >
                {isAdded ? "Added ✔" : "Add to Watchlist"}
              </button>
            )}

            {isWatchlist && (
              <button
                className="watchlist-btn"
                onClick={() => removeFromWatchlist(movie._id.$oid)}
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
