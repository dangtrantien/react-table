import PropTypes from "prop-types";
import { usePagination, DOTS } from "../hooks/usePagination";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons";
import "../css/pagination.css";

// ==============================|| PAGINATION ||============================== //

export default function Pagination(props) {
  const {
    totalCount,
    siblingCount = 1,
    currentPage,
    rowsPerPage,
    onPageChange,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    rowsPerPage,
  });

  let lastPage = paginationRange[paginationRange.length - 1];

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  const handlePrevPage = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <div className="container-pagination">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="btn-slide prev"
      >
        <IconChevronLeft />
      </button>

      <div className="container-dots">
        {paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return <div key={pageNumber}>&#8230;</div>;
          }

          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={currentPage === pageNumber ? "dot active" : "dot"}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      <button
        onClick={handleNextPage}
        disabled={currentPage === lastPage}
        className="btn-slide next"
      >
        <IconChevronRight />
      </button>
    </div>
  );
}

Pagination.propTypes = {
  pageCount: PropTypes.number,
  currentPage: PropTypes.number,
  rowsPerPage: PropTypes.number,
  onPageChange: PropTypes.func,
};
