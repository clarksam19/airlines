import React from "react";

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

const Table = ({
  columns = [{ name: "header", property: "value" }],
  format = (_, value) => value,
  className = "table",
  currentPage = [],
}) => {
  const tableBody = currentPage.map((route) => {
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
    <table className={className}>
      <Head columns={columns} />
      <tbody>{tableBody}</tbody>
    </table>
  );
};

export default Table;
