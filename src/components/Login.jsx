import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if ("email" === name) {
      setEmail(value);
    }
    if ("password" === name) {
      setPassword(value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password, navigate);
  };
  return (
    <>
      <div className="main">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="heading">
            <p>Log in</p>
          </div>
          <div className="account">
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              onChange={handleInput}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your Password"
              onChange={handleInput}
            />
            <p>
              Not have an account? <Link to="/signup">Signup</Link>
            </p>
          </div>
          <button className="login-btn">Log in</button>
        </form>
      </div>
    </>
  );
};

export default Login;
