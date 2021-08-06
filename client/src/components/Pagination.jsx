import React, { useState } from "react";

const Pagination = ({
  className,
  perPage,
  total,
  routes = [{ id: 1, value: "cell" }],
  children = [],
}) => {
  const [page, setPage] = useState(0);

  const start = page * perPage;

  const nextPage = (event) => {
    event.preventDefault();
    setPage(page + 1);
  };

  const previousPage = (event) => {
    event.preventDefault();
    setPage(page - 1);
  };

  const currentPage = routes.slice(start, start + perPage);
  const childrenWithProps = () => {
    return [children].map((child, index) => {
      return React.cloneElement(
        child,
        Object.assign({ currentPage, key: `display-${index}` }, child.props)
      );
    });
  };

  const message = currentPage.length
    ? `Showing ${start + 1}-${start + currentPage.length} of ${total} routes.`
    : "You have no saved routes";

  return (
    <div>
      <div>{childrenWithProps()}</div>
      <div className={className}>
        <p>{message}</p>
        <p>
          <button key="previous" disabled={page === 0} onClick={previousPage}>
            Previous Page
          </button>
          <button
            key="next"
            disabled={start + perPage >= total}
            onClick={nextPage}
          >
            Next Page
          </button>
        </p>
      </div>
    </div>
  );
};

export default Pagination;
