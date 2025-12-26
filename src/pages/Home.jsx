import React from "react";
import Navbar from "../components/Navbar";
import MovieGrid from "../components/MovieGrid";
import MovieDetail from "./MovieDetail";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home-main">
        <div className="container">
          <MovieGrid />
        </div>
      </div>
    </>
  );
};

export default Home;
