import React from "react";
import logo from "../../logo.svg";
import "./Navbar.css";

const Navbar: React.FC = ({}) => {
  return (
    <div className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Your Logo" className="logo" />
      </div>
      <div className="hamburger">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </div>
  );
};

export default Navbar;
