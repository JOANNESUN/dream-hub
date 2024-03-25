import React, { useState, useEffect } from "react";
import "./Header.css";
import getDate from "../../helper/date";
import Logo from "../Logo/Logo.js";
import Login from "../Login/Login.js";
import Signup from "../Login/SignUp.js";
import Logout from "../Login/Logout.js";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

function Header(props) {
  const [currentDate, setCurrentDate] = useState(getDate());
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [logoutStatus, setLogoutStatue] = useState(false);
  const isUserLogin = useSelector((state) => state.auth.userLoginStatus);
  const isUserSignup = useSelector((state) => state.auth.userSignupStatus);


  function toggleLoginModal() {
    setIsLoginModalOpen(!isLoginModalOpen);
  }

  function toggleSignupModal() {
    setIsSignupModalOpen(!isSignupModalOpen);
  }

  useEffect(() => {
    const showLogoutSuccessToast = localStorage.getItem(
      "showLogoutSuccessToast"
    );
    if (showLogoutSuccessToast === "true") {
      toast.success("You have logged out successfully", {
        position: "top-right",
        autoClose: 3000,
      });
      localStorage.removeItem("showLogoutSuccessToast");
    }
  }, []);

  function handleLogoutStatus(data) {
    setLogoutStatue(data);
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(false);
    if (logoutStatus === true) {
      setUserName("");
    }
  }

  function handleUserName(data) {
    setUserName(data);
  }

  return (
    <>
      <div className="header">
        <div className="header-left">
          <Link to={"/"}>
            <Logo username={userName} />
          </Link>
        </div>
        <div className="header-right">
          {!isUserLogin && !isUserSignup && (
            <>
              <button
                onClick={toggleLoginModal}
                className="video-game-button"
                style={{ marginRight: "1.5em" }}
              >
                Login
              </button>
              {isLoginModalOpen && (
                <Login
                  sendUserToParent={handleUserName}
                  closeModal={toggleLoginModal}
                />
              )}
              <button
                onClick={toggleSignupModal}
                className="video-game-button"
              >
                Sign up
              </button>
              {isSignupModalOpen && (
                <Signup
                  closeModal={toggleSignupModal}
  
                />
              )}
            </>
          )}
          {(isUserLogin || isUserSignup) && (
            <>
              <Logout sendDataToParent={handleLogoutStatus} />
              <Link
                to={"/journal"}
                className="video-game-button"
                style={{ color: "black" }}
              >
                Journal
              </Link>
            </>
          )}
        </div>
      </div>
      {userName && <div style={{ color: "white" }}>{userName}'s Account </div>}
    </>
  );
}

export default Header;
