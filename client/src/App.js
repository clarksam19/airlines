import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./routes/Home";
import UserAdmin from "./routes/UserAdmin";
import routeData from "./data";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/userAdmin">
          <Layout>
            <UserAdmin />
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
