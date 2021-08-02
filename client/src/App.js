import React, { Component } from "react";
import "./App.css";
import routeData from "./data";
import Table from "./components/Table";

const App = () => {
  const { routes, getAirlineById, getAirportByCode } = routeData;
  const columns = [
    { name: "Airline", property: "airline" },
    { name: "Source Airport", property: "src" },
    { name: "Destination Airport", property: "dest" },
  ];
  const formatValue = (property, value) => {
    if (property === "airline") {
      return getAirlineById(value);
    } else {
      return getAirportByCode(value);
    }
  };
  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <main>
        <Table
          className="routes-table"
          columns={columns}
          rows={routes}
          format={formatValue}
        />
      </main>
    </div>
  );
};

export default App;
