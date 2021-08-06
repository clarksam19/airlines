import React from "react";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./routes/Home";
import UserAdmin from "./routes/UserAdmin";
import MyRoutes from "./routes/MyRoutes";
import routeData from "./data";

const App = ({ history, context }) => {
  return (
    <Router history={history} context={context}>
      <Switch>
        <Route path="/userAdmin">
          <Layout>
            <UserAdmin />
          </Layout>
        </Route>
        <Route path="/myRoutes">
          <Layout>
            <MyRoutes />
          </Layout>
        </Route>
        <Route path="/">
          <Layout>
            <Home routeData={routeData} />
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
