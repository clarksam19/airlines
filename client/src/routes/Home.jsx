import React, { useState } from "react";
import Map from "../components/Map";
import Select from "../components/Select";
import Pagination from "../components/Pagination";
import Table from "../components/Table";

const Home = ({ routeData }) => {
  const { routes, airlines, airports, getAirlineById, getAirportByCode } =
    routeData;
  const [airline, setAirline] = useState("all");
  const [airport, setAirport] = useState("all");

  const formatValue = (property, value) => {
    if (property === "airline") {
      return getAirlineById(value).name;
    } else {
      return getAirportByCode(value).name;
    }
  };

  const airlineSelected = (value) => {
    if (value !== "all") {
      value = parseInt(value, 10);
    }

    setAirline(value);
  };

  const airportSelected = (value) => {
    setAirport(value);
  };

  const clearFilters = () => {
    setAirline("all");
    setAirport("all");
  };

  const filteredRoutes = routes.filter((route) => {
    return (
      (route.airline === airline || airline === "all") &&
      (route.src === airport || route.dest === airport || airport === "all")
    );
  });

  const filteredAirlines = airlines.map((airline) => {
    const active = !!filteredRoutes.find(
      (route) => route.airline === airline.id
    );
    return Object.assign({}, airline, { active });
  });

  const filteredAirports = airports.map((airport) => {
    const active = !!filteredRoutes.find((route) => {
      return route.src === airport.code || route.dest === airport.code;
    });
    return Object.assign({}, airport, { active });
  });

  const defaultsSelected = airline === "all" && airport === "all";

  const columns = [
    { name: "Airline", property: "airline" },
    { name: "Source Airport", property: "src" },
    { name: "Destination Airport", property: "dest" },
  ];
  return (
    <section>
      <Map routes={filteredRoutes} />
      <p>
        Show routes on
        <Select
          options={filteredAirlines}
          valueKey="id"
          titleKey="name"
          enabledKey="active"
          allTitle="All Airlines"
          value={airline}
          onSelect={airlineSelected}
        />
      </p>
      <p>
        Flying in or out of
        <Select
          options={filteredAirports}
          valueKey="code"
          titleKey="name"
          enabledKey="active"
          allTitle="All Airports"
          value={airline}
          onSelect={airportSelected}
        />
      </p>
      <button onClick={clearFilters} disabled={defaultsSelected}>
        Show All Routes
      </button>
      <Pagination
        className="pagination"
        perPage={25}
        total={filteredRoutes.length}
        routes={filteredRoutes}
      >
        <Table
          className="routes-table"
          columns={columns}
          rows={filteredRoutes}
          format={formatValue}
        />
      </Pagination>
    </section>
  );
};

export default Home;
