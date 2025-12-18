import React, { useState, useMemo } from "react";
import "./EmployeeTable.css";

const ITEMS_PER_PAGE = 15;

export default function EmployeeTable({ rows }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil((rows?.length || 0) / ITEMS_PER_PAGE);

  const paginatedRows = useMemo(() => {
    if (!rows || rows.length === 0) return [];

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return rows.slice(startIndex, endIndex);
  }, [rows, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  if (!rows || rows.length === 0) {
    return <p className="employeeTable__empty">No attendees.</p>;
  }

  return (
    <div className="employeeTable">
      <div className="employeeTable__info">
        <p>
          Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
          {Math.min(currentPage * ITEMS_PER_PAGE, rows.length)} of {rows.length}{" "}
          attendees
        </p>
      </div>

      <table className="employeeTable__table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee code</th>
            <th>Division</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {paginatedRows.map((r, idx) => (
            <tr key={idx}>
              <td>{r.name}</td>
              <td>{r.empCode}</td>
              <td>{r.division}</td>
              <td>{r.location}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="employeeTable__pagination">
          <button
            className="pagination__btn pagination__btn--prev"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Previous
          </button>

          <div className="pagination__numbers">
            {getPageNumbers().map((page, idx) =>
              page === "..." ? (
                <span key={`ellipsis-${idx}`} className="pagination__ellipsis">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  className={`pagination__number ${
                    currentPage === page ? "pagination__number--active" : ""
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              )
            )}
          </div>

          <button
            className="pagination__btn pagination__btn--next"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 12L10 8L6 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
