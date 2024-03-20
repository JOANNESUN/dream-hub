import React, { useState, useEffect } from "react";
import Modal from "../Modal/ModalComponent";
import "./LoginAndSignUp.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp(props) {
  const [showModal, setShowModal] = useState(true);
  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSignout, setIsSignout] = useState(false);

  useEffect(()=>{
    props.sendDataToParent(isSignout)
  }, [isSignout])

  function handleChange(e) {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  }

  // Must contain only letter (a-z or A-Z).
  // Must be between 8 and 20 characters long.
  function validateForm() {
    let isValid = true;
    const newErrors = {};

    if (!formInput.name) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (formInput.name.length < 3 || formInput.name.length > 20) {
      newErrors.name = "Name length: 3-20 letters";
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(formInput.name)) {
      newErrors.name = "Name must contain only letters";
      isValid = false;
    }

    // Validate email
    if (!formInput.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (formInput.email.length < 5 || formInput.email.length > 40) {
      newErrors.email = "Email length: 5-40 letters";
      isValid = false;
    }

    const passwordPattern = /^(?=.*[a-zA-Z]).{8,20}$/;

    // Validate password
    if (!formInput.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (!passwordPattern.test(formInput.password)) {
      newErrors.password = "Password must contain 8-20 letters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/signup`;
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formInput),
      })
        .then((res) => res.json())
        .then((data) => {
          setSubmitted(true);
          setIsSignout(true);
          toast.success("You have sign up successfully", {
            position: "top-left",
            autoClose: 3000,
          });
        })
        .catch((error) => {
          console.log("error:", error);
          toast.error("Error!", {
            position: "top-left",
            autoClose: 3000,
          });
        });
    }
  }


  return (
    <>
      <ToastContainer style={{ marginTop: "3em" }} />
      {submitted ? (
        <div>
          {" "}
          <ToastContainer style={{ marginTop: "3em" }} />
        </div>
      ) : (
        <Modal show={showModal} onClose={props.closeModal}>
          <form className="form-center-container" onSubmit={handleSubmit} autoComplete="off">
            <h2 style={{ padding: "1em" }}>Please Sign Up</h2>
            <div className="mb-3">
              <input
                type="name"
                name="name"
                value={formInput.name}
                className="form-control"
                placeholder="Enter name"
                onChange={handleChange}
                required
              />
              {errors.name && <div className="error">{errors.name}</div>}
            </div>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                value={formInput.email}
                className="form-control"
                placeholder="Enter email"
                onChange={handleChange}
                required
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                value={formInput.password}
                className="form-control"
                placeholder="Enter password"
                onChange={handleChange}
                required
              />
              {errors.password && (
                <div className="error">{errors.password}</div>
              )}
            </div>
            <div className="d-grid">
              <button
                type="submit"
                className="video-game-button"
                style={{ marginTop: "8px" }}
              >
                Submit
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
