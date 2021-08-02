import React from "react";

const Route = ({ route, column, format }) => {
  return <td>{format(column.property, route[column.property])}</td>;
};

const Table = ({ columns, rows, format }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => {
            return <th key={column.name}>{column.name}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map((route) => {
          return (
            <tr key={Object.values(route).join(":")}>
              {columns.map((column) => {
                return (
                  <Route
                    key={column.property + route[column.property]}
                    route={route}
                    column={column}
                    format={format}
                  />
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
