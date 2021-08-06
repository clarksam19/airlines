import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../reducers/rootReducer";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("loggedInUser");
  };
  const linkStyle = {
    padding: "5px",
  };
  return (
    <header className="header">
      <h1 className="title">Airline Routes</h1>
      <Link style={linkStyle} to={"/"}>
        Home
      </Link>
      <Link style={linkStyle} to={"/userAdmin"}>
        Login/Signup
      </Link>
      <Link style={linkStyle} to={"/myRoutes"}>
        My Routes
      </Link>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
};

const Footer = () => {
  return <p>App created by Sam Clark</p>;
};
const Layout = ({ children }) => {
  return (
    <div className="app">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
