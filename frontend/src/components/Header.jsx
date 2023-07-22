import React from "react";
import { Link } from "react-router-dom";

// rgb(233,0,140)
// rgb(255,0,82)
// rgb(255,59,59)
// rgb(249,149,103)
// rgb(246,209,144)
// rgb(246,243,183)

function Header() {
  const link_style = {
    color: "rgb(255,229,229)",
    fontSize: "1.3rem",
    fontFamily: "sans-serif",
  };
  return (
    <nav
      style={{ backgroundColor: "rgb(46,150,255)", marginBottom: "1rem" }}
      className="navbar navbar-expand-lg navbar-light"
    >
      <Link style={link_style} className="navbar-brand" to={"/"}>
        HOME
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
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            {/* <a className="nav-link" href="#">
              Home
            </a> */}
            <Link style={link_style} className="nav-link" to={"/"}>
              Admin Page
            </Link>
          </li>
          {/* <li className="nav-item active">
            <Link style={link_style} className="nav-link" to={"/orders"}>
              User Page
            </Link>
          </li> */}
          <li className="nav-item active">
            <Link style={link_style} className="nav-link" to={"/register"}>
              Register
            </Link>
          </li>
          {/* <li className="nav-item active">
            <Link className="nav-link" to={"/alert"}>
              Alert Page
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to={"/danger"}>
              Danger Page
            </Link>
          </li> */}
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
        style={{ fontSize: "2rem", color: "blue" }}
        className="bx bxs-user-circle"
      ></i>
    </nav>
  );
}

export default Header;
