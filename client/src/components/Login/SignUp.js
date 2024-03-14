import React, { useState } from "react";
import Modal from "../Modal/ModalComponent";
import "./LoginAndSignUp.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// in order to have a controlled form, needs to:
// control form input with useState
// need to add function to handle input
// need to add function to handle submit
// in handle submit, send req and receive data
export default function SignUp(props) {
  const [showModal, setShowModal] = useState(true);
  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    console.log(e.target.value);
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  }

  // Must contain at least one digit (0-9).
  // Must contain at least one letter (a-z or A-Z).
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
      console.log("formInput valid", formInput);
      setSubmitted(true);
      toast.success("Success!", {
        position: "top-center",
        autoClose: 2000,
      });
    } else {
      console.log("formInput invalid");
      toast.error("Error!", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  }

  return (
    <>
      <Modal show={showModal} onClose={props.closeModal}>
        <form className="form-center-container" onSubmit={handleSubmit}>
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
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          <div className="d-grid">
            <ToastContainer />
            <button type="submit" className="video-game-button" style={{marginTop: "8px"}}>
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
