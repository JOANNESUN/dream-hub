import React, { useState } from "react";
import "./Header.css";
import getDate from "../../helper/date";
import Logo from "../Logo/Logo.js";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function Header() {
  const [currentDate, setCurrentDate] = useState(getDate());
  return (
    <div className="header">
      <div className="header-left" style={{ marginLeft: "3em" }}>
        <ul>{currentDate}</ul>
        <Link to={"/"}>
          <Logo />
        </Link>
      </div>
      <div className="header-right" style={{ marginRight: "3em" }}>
        <Link to={"/sign-in"} className="video-game-button" style={{fontSize: "13px", color: "#382b22"}}>
          Login
        </Link>
        <Link to={"/sign-up"} className="video-game-button" style={{fontSize: "13px", color: "#382b22"}}>
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default Header;
