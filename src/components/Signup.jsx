import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
  });

  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.contact.length < 10) {
      toast.error("Mobile number must be at least 10 digits");
      return;
    }
    signup(data, navigate);
  };
  return (
    <>
      <div className="main">
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="heading">
            <p>Sign Up</p>
          </div>
          <div className="account">
            <input
              type="text"
              name="name"
              placeholder="Enter your Name"
              onChange={handleInput}
            />
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
            <input
              type="number"
              name="contact"
              placeholder="Enter your mobile no"
              maxLength={10}
              onChange={handleInput}
            />
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
