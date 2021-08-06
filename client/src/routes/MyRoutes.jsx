import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../reducers/rootReducer";
import Pagination from "../components/Pagination";
import Table from "../components/Table";
import userAdminService from "../services/userAdminService";

const MyRoutes = () => {
  const reduxUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const user = JSON.parse(window.localStorage.getItem("loggedInUser"));
      if (user) {
        const res = await userAdminService.load(user.username);
        dispatch(setUser(res));
      } else {
        return;
      }
    };

    fetchUser();
  }, [dispatch]);

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
        total={(reduxUser.routes || []).length}
        routes={reduxUser.routes || []}
      >
        <Table
          className="routes-table"
          columns={columns}
          dispatch={dispatch}
          user={reduxUser}
        />
      </Pagination>
    </div>
  );
};

export default MyRoutes;
