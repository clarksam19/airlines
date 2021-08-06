import React, { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import Table from "../components/Table";
import userAdminService from "../services/userAdminService";

const MyRoutes = () => {
  const [user, setUser] = useState({ routes: [] });

  useEffect(() => {
    const fetchUser = async () => {
      const user = JSON.parse(window.localStorage.getItem("loggedInUser"));
      const res = await userAdminService.load(user.username);
      setUser(res);
    };

    fetchUser();
  }, []);

  const columns = [
    { name: "Airline", property: "airline" },
    { name: "Source Airport", property: "src" },
    { name: "Destination Airport", property: "dest" },
  ];

  return (
    <div>
      <h2>My Routes</h2>
      <Pagination
        className="pagination"
        perPage={25}
        total={user.routes.length}
        routes={user.routes}
      >
        <Table className="routes-table" columns={columns} />
      </Pagination>
    </div>
  );
};

export default MyRoutes;
