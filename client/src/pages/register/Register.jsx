import React, { useEffect, useState } from "react";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    company: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", inputs);
      navigate("/login");
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="company"
          name="company"
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

          <div className="show-password" onClick={handlePasswordToggle}>
            {showPassword ? (
              <img src="./view.png" className="eye" alt="" />
            ) : (
              <img src="./hide.png" className="eye" alt="" />
            )}
          </div>
        </div>

        <button className="register-button" type="submit" >
          Register
        </button>
        {error && <p>{error}</p>}
        <span>
          Already have an account? <Link to="/login">Login</Link>{" "}
        </span>
      </form>
    </div>
  );
};

export default Register;
