import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const link_style = {
    color: "rgb(255,229,229)",
    fontSize: "1.3rem",
    fontFamily: "sans-serif",
  };

  // chakra ui

  return (
    <>
      <nav
        style={{ backgroundColor: "rgb(46,150,255)", marginBottom: "1rem" }}
        className="navbar navbar-expand-lg navbar-light"
      >
        <Link style={link_style} className="navbar-brand" to={"/"}>
          <i style={{ fontSize: "20px" }} className="bx bx-trip"></i>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          {/* <span className="navbar-toggler-icon"></span> */}
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link style={link_style} className="nav-link" to={"/register"}>
                Register
              </Link>
            </li>
          </ul>
        </div>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
        <i
          style={{ fontSize: "2.4rem", color: "white", cursor: "Pointer" }}
          onClick={() => {
            let loggedIn = localStorage.getItem("user_login_token") || null;

            if (!loggedIn) {
              navigate("/register");
            } else {
              navigate("/user-profile");
            }
          }}
          className="bx bxs-user-circle"
        ></i>
      </nav>
    </>
  );
}

export default Header;
