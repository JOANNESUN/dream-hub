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
function Header(props) {
  const [currentDate, setCurrentDate] = useState(getDate());

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [userName, setUserName] = useState("");
  const [logoutStatus, setLogoutStatue] = useState(false);
  const [signupStatus, setSignUpStatus] = useState(false);

  function toggleLoginModal() {
    setIsLoginModalOpen(!isLoginModalOpen);
  }

  function toggleSignupModal() {
    setIsSignupModalOpen(!isSignupModalOpen);
  }

  function handleLoginStatus(data) {
    console.log("data from login", data);
    setLoginStatus(data);
    props.handleLoginStatus(data);
  }


  useEffect(() => {
    const showLogoutSuccessToast = localStorage.getItem("showLogoutSuccessToast");
    if (showLogoutSuccessToast === "true") {
        toast.success("You have logged out successfully", {
            position: "top-right",
            autoClose: 3000,
        });
        localStorage.removeItem("showLogoutSuccessToast"); // Clear the flag
    }
}, []);

  function handleLogoutStatus(data) {
    setLogoutStatue(data);
    props.handleSignUpStatus(data);
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(false);
    //setUserName("");
    if (logoutStatus === true) {
      setLoginStatus(false);
      setSignUpStatus(false);
    }
  }

  function handleSignUpStatus(data) {
    setSignUpStatus(data);
    console.log("signupStatus", signupStatus);
  }

  function handleUserName(data) {
    setUserName(data);
  }

  // logic: fresh, show login and signup
  // if login, hide signup and show logout and journal
  // if signup, show logout and journal
  // if logout, hide journal and show login

  return (
    <>
      <div className="header">
        <div className="header-left">
          <ul>{currentDate}</ul>
          <Link to={"/"}>
            <Logo username={userName} />
          </Link>
        </div>
        <div className="header-right">
          {!loginStatus && !signupStatus &&  (
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
                  sendDataToParent={handleLoginStatus}
                  sendUserToParent={handleUserName}
                  closeModal={toggleLoginModal}
                />
              )}
              <button
                onClick={toggleSignupModal}
                className="video-game-button"
                // style={{ marginRight: "1.5em" }}
              >
                Sign up
              </button>
              {isSignupModalOpen && (
                <Signup
                  closeModal={toggleSignupModal}
                  sendDataToParent={handleSignUpStatus}
                />
              )}
            </>
          )}
          {(loginStatus || signupStatus) && (
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
