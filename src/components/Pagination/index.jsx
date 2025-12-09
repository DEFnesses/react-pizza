import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

const Pagination = ({ currentPage, pageCount, onChangePage}) => {
  const handlePageClick = (event) => {
    onChangePage(event.selected + 1);
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
        pageCount={pageCount}          
        forcePage={currentPage - 1} 
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
