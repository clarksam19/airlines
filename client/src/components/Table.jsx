import React, { useState } from "react";

const Row = ({ route, column, format }) => {
  return <td>{format(column.property, route[column.property])}</td>;
};

const Head = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map((column) => {
          return <th key={column.name}>{column.name}</th>;
        })}
      </tr>
    </thead>
  );
};

const Pagination = ({ className, start, perPage, total, page, setPage }) => {
  const nextPage = (event) => {
    event.preventDefault();
    setPage(page + 1);
  };

  const previousPage = (event) => {
    event.preventDefault();
    setPage(page - 1);
  };
  return (
    <div className={className}>
      <p>
        Showing {start + 1}-{start + perPage} of {total} routes.
      </p>
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
  );
};
const Table = ({
  columns = [{ name: "header", property: "value" }],
  rows = [{ id: 1, value: "cell" }],
  format = (_, value) => value,
  perPage = 25,
  className = "table",
}) => {
  const [page, setPage] = useState(0);

  const start = page * perPage;

  const tableBody = rows.slice(start, start + perPage).map((route) => {
    return (
      <tr key={Object.values(route).join(":")}>
        {columns.map((column) => {
          return (
            <Row
              key={column.property + route[column.property]}
              route={route}
              column={column}
              format={format}
            />
          );
        })}
      </tr>
    );
  });

  return (
    <div>
      <table className={className}>
        <Head columns={columns} />
        <tbody>{tableBody}</tbody>
      </table>
      <Pagination
        className="pagination"
        start={start}
        perPage={perPage}
        total={rows.length}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default Table;
