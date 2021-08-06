import React from "react";
import routeService from "../services/routeService";

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
  // const [savedRoutes, setSavedRoutes] = useState([]);

  const addRoute = ({ currentTarget }) => {
    const cells = currentTarget.children;
    const params = [...cells].map((cell) => cell.textContent);
    const route = {
      airline: params[0],
      src: params[1],
      dest: params[2],
    };

    if (window.confirm(`Add ${Object.values(route).join("-")} to My Routes?`)) {
      routeService.create(route);
      // setSavedRoutes(savedRoutes.concat(route));
    } else {
      return;
    }
  };

  const removeRoute = ({ currentTarget }) => {
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
      routeService.remove(currentTarget.id);
      // setSavedRoutes(savedRoutes.concat(route));
    } else {
      return;
    }
  };

  const handleRowClick = (event) => {
    if (document.querySelector("h2").textContent === "My Routes") {
      removeRoute(event);
    } else {
      addRoute(event);
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
