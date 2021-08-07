import React, { useState } from "react";
import { removeRoute, addRoute } from "../reducers/rootReducer";
import Notification from "../components/Notification";
import notify from "../utils/notify";

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
  const [notification, setNotification] = useState(notify().reset);

  const isLoggedIn = () => {
    return !!window.localStorage.getItem("loggedInUser");
  };

  const resetNotification = () => {
    setTimeout(() => {
      setNotification(notify().reset);
    }, 5000);
  };

  const addSelectedRoute = async ({ currentTarget }) => {
    const cells = currentTarget.children;
    const params = [...cells].map((cell) => cell.textContent);
    const route = {
      airline: params[0],
      src: params[1],
      dest: params[2],
    };

    if (window.confirm(`Add ${Object.values(route).join("-")} to My Routes?`)) {
      try {
        await dispatch(addRoute(route));
        setNotification(notify().success.add);
        resetNotification();
      } catch (error) {
        setNotification(notify().error.add);
        resetNotification();
      }
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
      window.confirm(`Remove ${Object.values(route).join("-")} from My Routes?`)
    ) {
      try {
        await dispatch(removeRoute(currentTarget.id));
        setNotification(notify().success.remove);
        resetNotification();
      } catch (error) {
        setNotification(notify().error.remove);
        resetNotification();
      }
    } else {
      return;
    }
  };

  const handleRowClick = (event) => {
    if (isLoggedIn()) {
      if (document.querySelector("h2")) {
        removeSelectedRoute(event);
      } else {
        addSelectedRoute(event);
      }
    } else {
      setNotification(notify().deny.add);
      resetNotification();
      return;
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
    <>
      <Notification notification={notification} />
      <table className={className}>
        <Head columns={columns} />
        <tbody>{tableBody}</tbody>
      </table>
    </>
  );
};

export default Table;
