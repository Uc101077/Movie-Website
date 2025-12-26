import React from "react";

const Pagination = (props) => {
  const { totalMovies, moviesPerPage, currentPage, setCurrentPage } = props;

  const totalPages = Math.ceil(totalMovies / moviesPerPage);

  if (totalPages === 1) return null;

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Prev
      </button>

      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;

        if (page < currentPage - 1 || page > currentPage + 2) return null;

        return (
          <button
            key={index}
            className={currentPage === page ? "active" : ""}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        );
      })}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
