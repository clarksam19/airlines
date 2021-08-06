import React from "react";
import { removeRoute, addRoute } from "../reducers/rootReducer";
// import routeService from "../services/routeService";

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
  dispatch,
}) => {
  const addSelectedRoute = async ({ currentTarget }) => {
    const cells = currentTarget.children;
    const params = [...cells].map((cell) => cell.textContent);
    const route = {
      airline: params[0],
      src: params[1],
      dest: params[2],
    };

    if (window.confirm(`Add ${Object.values(route).join("-")} to My Routes?`)) {
      await dispatch(addRoute(route));
    } else {
      return;
    }
  };

  const removeSelectedRoute = async ({ currentTarget }) => {
    const cells = currentTarget.children;
    const params = [...cells].map((cell) => cell.textContent);
    const route = {
      airline: params[0],
      src: params[1],
      dest: params[2],
    };

    if (
      window.confirm(`Remove ${Object.values(route).join("-")} to My Routes?`)
    ) {
      await dispatch(removeRoute(currentTarget.id));
    } else {
      return;
    }
  };

  const handleRowClick = (event) => {
    if (document.querySelector("h2")) {
      removeSelectedRoute(event);
    } else {
      addSelectedRoute(event);
    }
  };
  const tableBody = currentPage.map((route) => {
    return (
      <tr
        key={Object.values(route).join(":")}
        onClick={handleRowClick}
        id={route.id ? route.id : ""}
      >
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
