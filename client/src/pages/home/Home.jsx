import React, { useEffect, useState } from "react";
import axios from "axios";
import "./home.scss";

const Home = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/auth/profile", { withCredentials: true });
        setCurrentUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);
  return (
    <div className="home">
      <h2>PROFILE DETAILS</h2>
      <div className="container">
        <div className="user-profile">
          <div className="profileDetails">
            <div className="profile-item">
              <img src="./noavatar.jpg" className="profile-icon" alt="" />
              <h3 className="user-name">{currentUser.username}</h3>
            </div>

            <div className="profile-item">
              <img src="./message.png" className="profile-icon" alt="" />
              <h3 className="user-email">{currentUser.email}</h3>
            </div>

            <div className="profile-item">
              <img src="./bag2.jpg" className="profile-icon" alt="" />
              <h3 className="user-company">{currentUser.company}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
