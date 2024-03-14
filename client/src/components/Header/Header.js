import React, { useState } from "react";
import "./Header.css";
import getDate from "../../helper/date";
import Logo from "../Logo/Logo.js";
import Login from "../Login/Login.js";
import Signup from "../Login/SignUp.js";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function Header() {
  const [currentDate, setCurrentDate] = useState(getDate());

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  function toggleLoginModal() {
    setIsLoginModalOpen(!isLoginModalOpen);
  }

  function toggleSignupModal() {
    setIsSignupModalOpen(!isSignupModalOpen);
  }

  return (
    <div className="header">
      <div className="header-left">
        <ul>{currentDate}</ul>
        <Link to={"/"}>
          <Logo />
        </Link>
      </div>
      <div className="header-right">
        <button
          onClick={toggleLoginModal}
          className="video-game-button"
          style={{ marginRight: "1.5em" }}
        >
          Login
        </button>
        {isLoginModalOpen ? <Login closeModal={toggleLoginModal} /> : ""}
        <button
          onClick={toggleSignupModal}
          className="video-game-button"
          style={{ marginRight: "1.5em" }}
        >
          Sign up
        </button>
        {isSignupModalOpen ? <Signup closeModal={toggleSignupModal} /> : ""}
        {/* disable if no login or signup */}
        <Link to={"/journal"} className="video-game-button"
        style={{color: "black"}}
        >
        Journal
        </Link>
      </div>
    </div>
  );
}

export default Header;
