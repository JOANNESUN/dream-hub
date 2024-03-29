import React, { useState, useEffect, useRef } from "react";
import Modal from "../Modal/ModalComponent";
import "./LoginAndSignUp.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateLoginStatus } from "../../store/UserStatusSlice";
import { setUserName } from "../../store/UserNameSlice";

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function Login(props) {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(true);
  const [inputField, setInputField] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const toastId = useRef(null);

  function handleChange(e) {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  }

  function validation() {
    const newError = {};
    let isValid = true;

    if (!inputField.email) {
      newError.email = "Email is required";
      isValid = false;
    } else if (inputField.email.length < 5 || inputField.email.length > 40) {
      newError.email = "Email length: 5-40 letters";
      isValid = false;
    }

    const passwordPattern = /^(?=.*[a-zA-Z]).{8,20}$/;

    if (!inputField.password) {
      newError.password = "Password is required";
      isValid = false;
    } else if (!passwordPattern.test(inputField.password)) {
      newError.password = "Password must contain 8-20 letters";
      isValid = false;
    }
    setError(newError);
    return isValid;
  }

  // local jwt login
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validation()) {
      const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/login`;
      axios
        .post(apiUrl, inputField, {
          headers: {
            "Content-type": "application/json",
          },
        })
        .then((response) => {
          localStorage.setItem("token", response.data.token);

          setShowModal(false);

          toast.success("You have login successfully", {
            position: "top-center",
            autoClose: 3000,
          });

          setTimeout(() => {
            dispatch(setUserName(response.data.username));
            dispatch(updateLoginStatus(true));
          }, 3000);

        })
        .catch((error) => {
          let errorMessage = "Error!"; // Default error message
          if (error.response && error.response.data) {
            errorMessage = error.response.data;
          }
          if (!toast.isActive(toastId.current)) {
            toastId.current = toast.error(errorMessage, {
              position: "top-center",
              autoClose: 3000,
            });
          }
        });
    }
  };

  // google login
  const responseMessage = (response) => {
    if (response) {
      let userObject;
      try {
        // Perform actions based on decoded information
        userObject = jwtDecode(response.credential);
        const data = {
          token: response.credential,
        };

        const googleSignInUrl = `${process.env.REACT_APP_BACKEND_URL}/googlelogin`;

        axios
          .post(googleSignInUrl, data, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userName", userObject.name);
            localStorage.setItem("userEmail", userObject.email);

            setShowModal(false);

            toast.success("You have logged in successfully with Google", {
              position: "top-center",
              autoClose: 3000,
            });

            setTimeout(() => {
              dispatch(setUserName(userObject.given_name));
              dispatch(updateLoginStatus(true));
            }, 3000);
          });
      } catch (error) {
        console.error("Error decoding the JWT token:", error);
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.error(
            "Failed to login with Google. Please try again.",
            {
              position: "top-center",
              autoClose: 3000,
            }
          );
        }
      }
    }
  };

  return (
    <>
      <ToastContainer style={{ marginTop: "3em" }} />
      <Modal show={showModal} onClose={props.closeModal}>
        <form
          className="form-center-container"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <h2 style={{ padding: "0.5em 1em 0 1em" }}>Please login</h2>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              value={inputField.email}
              className="form-control"
              placeholder="Enter email"
              onChange={handleChange}
            />
            {error.email && <div className="error">{error.email}</div>}
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              name="password"
              value={inputField.password}
              placeholder="Enter password"
              onChange={handleChange}
              autoComplete="current-password"
            />
            {error.password && <div className="error">{error.password}</div>}
          </div>
          {/* implement remember me later */}
          {/* <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div> */}
          <div className="d-grid">
            <button
              type="submit"
              className="video-game-button"
              style={{ marginTop: "1.5em" }}
            >
              Submit
            </button>
          </div>
          <h2 style={{ margin: "1em" }}>or</h2>
          <h3>Sign in with Google</h3>
          <br />
          <br />
          <GoogleLogin onSuccess={responseMessage} />

          {/* implement forgot password later */}
          {/* <p className="forgot-password text-right" style={{marginTop: "3em"}}>
        <a href="#" style={{color: "black"}}> Forgot password?</a>
        </p> */}
        </form>
      </Modal>
    </>
  );
}
