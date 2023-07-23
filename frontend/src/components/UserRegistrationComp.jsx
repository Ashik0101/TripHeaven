import style from "../styles/UserRegistrationComp.module.css";
import React, { useState } from "react";
import axios from "axios";
import url from "./url";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";

function UserRegistrationComp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    date_of_birth: "",
    location: "",
    bio: "",
    gender: "",
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
    console.log("Form data to be submitted:", formData);
    if (
      !formData.name ||
      !formData.age ||
      !formData.gender ||
      !formData.location ||
      !formData.email ||
      !formData.password
    ) {
      return;
    }
    // Making a POST request to a dummy URL using axios
    axios
      .post(`${url}/auth/register`, formData)
      .then((response) => {
        if (response.status === 201) {
          notifyAfterRegistration();
        }
      })
      .catch((error) => {
        if (error.response.status === 409) {
          notifyUserAlreadyExists();
        } else {
          notifySomethingWentWrong();
        }
        console.log("POST request error:", error);
      });
  };
  function getFormattedDate() {
    const today = new Date();
    let month = String(today.getMonth() + 1).padStart(2, "0");
    let day = String(today.getDate()).padStart(2, "0");
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  }

  const notifyAfterRegistration = () => {
    toast.success("Registration Successfull!", {
      position: "top-center",
      theme: "colored",
    });
  };

  function notifyUserAlreadyExists() {
    toast.error("User Already Exists!", {
      position: "top-center",
      theme: "colored",
    });
  }
  function notifySomethingWentWrong() {
    toast.error("Something went wrong!", {
      position: "top-center",
      theme: "colored",
    });
  }
  return (
    <>
      <form className={style.form} onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className="form-group col-md-12">
          <label htmlFor="inputName">Name</label>
          <input
            type="text"
            id="inputName"
            className="form-control"
            name="name"
            placeholder="Name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>
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
        <div className="form-group col-md-12">
          <label htmlFor="inputAge">Age</label>
          <input
            type="number"
            id="inputAge"
            className="form-control"
            name="age"
            placeholder="Age"
            required
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-12">
          <label htmlFor="inputDateOfBirth">Date Of Birth</label>
          <input
            type="date"
            id="inputDateOfBirth"
            className="form-control"
            name="date_of_birth"
            placeholder="Date Of Birth"
            required
            max={getFormattedDate()}
            value={formData.date_of_birth}
            onChange={handleChange}
          />
        </div>

        <div className="form-group col-md-12">
          <label htmlFor="inputLocation">Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            id="inputLocation"
            placeholder="1234 Main St"
            required
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="form-group col-md-12">
          <label htmlFor="inputBio">Bio</label>
          <input
            type="text"
            id="inputBio"
            className="form-control"
            name="bio"
            placeholder="Bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </div>

        <div className="form-group col-md-12">
          <label htmlFor="inputGender">Gender</label>
          <select
            name="gender"
            id="inputGender"
            className="form-control"
            required
            value={formData.gender}
            onChange={handleChange}
          >
            <option disabled>Choose...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Sign up
          </button>
          <button
            onClick={() => navigate("/login")}
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
