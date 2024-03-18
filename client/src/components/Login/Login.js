import React, { useState, useEffect } from "react";
import Modal from "../Modal/ModalComponent";
import "./LoginAndSignUp.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login(props) {
  const [showModal, setShowModal] = useState(true);
  const [inputField, setInputField] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    props.sendDataToParent(isAuth);
  }, [isAuth]);

  useEffect(() => {
    props.sendUserToParent(userName);
  }, [userName]);

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

  function handleSubmit(e) {
    e.preventDefault();
    if (validation()) {
      const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/login`;
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(inputField),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.token)
          toast.success("You have login successfully", {
            position: "top-left",
            autoClose: 3000,
          });
          console.log("login success");
          localStorage.setItem("token", data.token);
          setUserName(data.username);
          setSubmitted(true);
          setIsAuth(true);
        })
        .catch((error) => {
          toast.error("Error!", {
            position: "top-left",
            autoClose: 3000,
          });
        });
    }
  }

  return (
    <>
      {submitted ? (
        <ToastContainer style={{ marginTop: "3em" }} />
      ) : (
        <>
          <Modal show={showModal} onClose={props.closeModal}>
            <form className="form-center-container" onSubmit={handleSubmit}
            autoComplete="off">
              <h2 style={{ padding: "1em" }}>Please login</h2>
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
                {error.password && (
                  <div className="error">{error.password}</div>
                )}
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
              {/* implement forgot password later */}
              {/* <p className="forgot-password text-right" style={{marginTop: "3em"}}>
        <a href="#" style={{color: "black"}}> Forgot password?</a>
        </p> */}
            </form>
          </Modal>
        </>
      )}
    </>
  );
}
