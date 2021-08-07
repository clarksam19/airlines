import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/rootReducer";
import { Link } from "react-router-dom";
import Notification from "./Notification";
import notify from "../utils/notify";

const Header = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.user.username);
  const [notification, setNotification] = useState(notify().reset);

  const resetNotification = () => {
    setTimeout(() => {
      setNotification(notify().reset);
    }, 1000);
  };

  const handleLogout = () => {
    dispatch(logout());
    setNotification(notify().success.logout);
    resetNotification();
  };

  const linkStyle = {
    padding: "5px",
  };

  if (loggedIn) {
    return (
      <header className="header">
        <h1 className="title">Airline Routes</h1>
        <Link style={linkStyle} to={"/"}>
          Home
        </Link>
        <Link style={linkStyle} to={"/myRoutes"}>
          My Routes
        </Link>
        <button onClick={handleLogout}>Logout</button>
      </header>
    );
  } else {
    return (
      <header className="header">
        <h1 className="title">Airline Routes</h1>
        <Notification notification={notification} />
        <Link style={linkStyle} to={"/"}>
          Home
        </Link>
        <Link style={linkStyle} to={"/userAdmin"}>
          Login/Signup
        </Link>
      </header>
    );
  }
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
