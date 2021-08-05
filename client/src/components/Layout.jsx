import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <h1 className="title">Airline Routes</h1>
      <Link to={"/"}>Home</Link>
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
