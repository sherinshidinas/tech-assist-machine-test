import React from "react";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async (req, res) => {
    try {
      await axios.post("/auth/logout");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <img src="./companyLogo.png" alt="" />
        </div>
        <div className="links">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
