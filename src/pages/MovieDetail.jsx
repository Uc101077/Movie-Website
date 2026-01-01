import React, { useContext, useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import movieData from "../data/movies";
import { AuthContext } from "../context/AuthContext";

const MovieDetail = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDetails, setShowDetails] = useState(true);

  const videoRef = useRef(null);
  const hideTimeoutRef = useRef(null);

  const { id } = useParams();

  const { watchlist, addToWatchlist, removeFromWatchlist } =
    useContext(AuthContext);

  const movie = movieData.find((m) => m._id.$oid === id);
    
  useEffect(() => {
    const video = videoRef.current;
    return () => {
      if (video) {
        video.pause();
      }
    };
  }, []);

  if (!movie)
    return (
      <h2 style={{ color: "white", textAlign: "center" }}>No Details Found</h2>
    );

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const isInWatchlist =
    watchlist.filter((m) => m._id?.$oid === movie._id?.$oid).length > 0;



  const triggerDetailsVisibility = () => {
    setShowDetails(true);

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    hideTimeoutRef.current = setTimeout(() => {
      setShowDetails(false);
    }, 5000);
  };

  return (
    <div
      className="movie-detail-main"
      onMouseMove={() => {
        if (isPlaying) {
          triggerDetailsVisibility();
        }
      }}
    >
      {movie?.trailer && (
        <div className="trailer-background">
          <video
            ref={videoRef}
            className="trailer-video"
            src={movie.trailer}
            loop
            muted={isMuted}
            playsInline
            preload="metadata"
          />
          <div className="trailer-overlay" />
        </div>
      )}

      <div
        className={`movie-detail-wrapper
    ${isPlaying && showDetails ? "faded" : ""}
    ${isPlaying && !showDetails ? "hidden" : ""}
  `}
      >
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
            <button
              className="btn-primary"
              onClick={() => {
                if (!videoRef.current) return;

                if (isPlaying) {
                  videoRef.current.pause();
                  setIsPlaying(false);
                  setShowDetails(true); // show permanently when paused
                  clearTimeout(hideTimeoutRef.current);
                } else {
                  videoRef.current.play().catch(() => {});
                  setIsPlaying(true);
                  triggerDetailsVisibility(); // start 5s timer
                }
              }}
            >
              {isPlaying ? "Pause" : "Watch Trailer"}
            </button>
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

        {!isPlaying && (
          <div className="poster-section">
            <img
              src={movie.poster}
              alt={movie.title}
              className="movie-poster"
            />
          </div>
        )}
      </div>
      {movie?.trailer && (
        <button
          onClick={toggleMute}
          className="mute-button"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? "🔇" : "🔊"}
        </button>
      )}
    </div>
  );
};

export default MovieDetail;
