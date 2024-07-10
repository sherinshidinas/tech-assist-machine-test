import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import "./home.scss";

const Home = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/auth/profile", { withCredentials: true });
        setCurrentUser(res.data);
      } catch (error) {
        console.log(error);
      } finally{
        setLoading(false)
      }
    };
    fetchProfile();
  }, []);

  const isEmpty = (obj) => Object.keys(obj).length === 0;

  return (
    <div className="home">
      <h2>PROFILE DETAILS</h2>

      <div className="container">
        { loading ? <Loader/> : isEmpty(currentUser) ? (
          <div className="no-data">
            <h3>Oops, No Data Found. Please Login...</h3>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default Home;
