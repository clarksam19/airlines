import React from "react";

const Route = ({ route, getAirlineById, getAirportByCode }) => {
  return (
    <tr>
      <td>{getAirlineById(route.airline)}</td>
      <td>{getAirportByCode(route.src)}</td>
      <td>{getAirportByCode(route.dest)}</td>
    </tr>
  );
};

const Table = ({ rows, routeData }) => {
  const { routes, getAirlineById, getAirportByCode } = routeData;
  return (
    <table rows={rows}>
      <tbody>
        <tr>
          <td>Airline</td>
          <td>Source Airport</td>
          <td>Destination Airport</td>
        </tr>
        {routes.map((route, idx) => {
          return (
            <Route
              key={idx}
              route={route}
              getAirlineById={getAirlineById}
              getAirportByCode={getAirportByCode}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
