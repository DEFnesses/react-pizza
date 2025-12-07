import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
    window.scrollTo(0, 0);
  };
  return (
    <div>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        previousLabel="<"
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        forcePage={currentPage - 1}
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
