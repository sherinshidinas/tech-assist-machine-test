import React, { useState,useEffect } from "react";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/auth/profile', { withCredentials: true });
        setCurrentUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser()
  }, []);


  console.log("from navbar",currentUser)

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
          {currentUser ? (<button className="log-button" onClick={handleLogout}>Logout</button>) : (<button className="log-button"><Link to="/login">Login</Link></button>)}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
