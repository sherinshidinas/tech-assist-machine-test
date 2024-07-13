import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.scss";
const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [error, SetError] = useState(null);

  const navigate = useNavigate();

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", inputs);
      alert(res.data.message);
      navigate("/");
    } catch (error) {
      SetError(error.response.data);
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />

        <div className="passwordContainer">
          <input
            required
            type={showPassword ? "text" : "password"}
            placeholder="password"
            name="password"
            onChange={handleChange}
          />

          <div className="showPassword" onClick={handlePasswordToggle}>
            {showPassword ? (
              <img src="./view.png" alt="" />
            ) : (
              <img src="./hide.png" alt="" />
            )}
          </div>
        </div>

        <button className="login-button" type="submit">
          Login
        </button>
        {error && <p>{error}</p>}
        <span>
          Don't have an account? <Link to="/register">Register</Link>{" "}
        </span>
      </form>
    </div>
  );
};

export default Login;
