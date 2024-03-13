import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/signup" className="nav-link">
        Signup
      </Link>
      <Link to="/login" className="nav-link">
        Login
      </Link>
      <Link to="/employeelist" className="nav-link">
        Employee List
      </Link>
    </div>
  );
}

export default Navbar;
