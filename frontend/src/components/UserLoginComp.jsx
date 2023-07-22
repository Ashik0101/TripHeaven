import React, { useState } from "react";
import axios from "axios";
import url from "./url";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "../styles/UserLoginComp.module.css";

function UserRegistrationComp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Form data to be submitted:", formData);
    if (!formData.email || !formData.password) {
      return;
    }
    // Making a POST request to a dummy URL using axios
    axios
      .post(`${url}/auth/login`, formData)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("user_login_token", response.data.token);
          console.log(response.data);
          notifyAfterLogin();
          setFormData({
            email: "",
            password: "",
          });
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      })
      .catch((error) => {
        if (error.response.status === 404 || error.response.status === 400) {
          notifyInvalidCreadentials();
        }
        console.log("POST request error:", error);
      });
  };

  const notifyAfterLogin = () => {
    toast.success("Login Successfull!", {
      position: "top-center",
      theme: "colored",
    });
  };

  function notifyInvalidCreadentials() {
    toast.error("Invalid Credentials!", {
      position: "top-center",
      theme: "colored",
    });
  }

  return (
    <>
      <form className={style.form} onSubmit={handleSubmit}>
        <h1>Login</h1>

        <div className="form-group col-md-12">
          <label htmlFor="inputEmail">Email</label>
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-12">
          <label htmlFor="inputPassword">Password</label>
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          {/* <button className="btn btn-primary">Sign up</button> */}
          <button
            type="submit"
            style={{ marginLeft: ".4rem" }}
            className="btn btn-primary"
          >
            Login
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}

export default UserRegistrationComp;
