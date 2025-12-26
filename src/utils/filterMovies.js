const filterMovies = (movies, searchQuery, genre, releaseYear) => {
  return movies.filter((movie) => {
    const searchMatch = movie.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const genreMatch = genre === "Genre" || movie.genre?.includes(genre);

    const yearMatch =
      releaseYear === "Year" || movie.year === Number(releaseYear);

    return searchMatch && genreMatch && yearMatch;
  });
};

export default filterMovies;
