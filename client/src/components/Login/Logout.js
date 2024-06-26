import React, { useEffect, useState, useRef } from "react";
import "./LoginAndSignUp.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../Spinner/Spinner";
import { googleLogout } from '@react-oauth/google';
import { useSelector, useDispatch } from "react-redux";
import { updateLoginStatus, updateSignupStatus } from "../../store/UserStatusSlice";
import { setUserName } from '../../store/UserNameSlice';

function Logout(props) {
  const [isLogout, setIsLogout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const toastId = useRef(null);
  const token = localStorage.getItem("token");
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (data.success) {
        localStorage.removeItem("token"); // For traditional auth
        localStorage.removeItem("userName"); // for google sign in api
        localStorage.removeItem("userEmail");// for google sign in api
        toast.success("You have logout successfully", {
          position: "top-right",
          autoClose: 2000,
          onClose: () => {
            setIsLogout(true);
            googleLogout();
            dispatch(updateLoginStatus(false));
            dispatch(updateSignupStatus(false));
            dispatch(setUserName(''));
            setTimeout(() => {
              window.location.href = "/";
            }, 100);
            setIsLoading(false); 
          },
        });
      } else {
        setIsLoading(false);
        if(!toast.isActive(toastId.current)){
          toastId.current = toast.error("Error!", {
            position: "top-left",
            autoClose: 2200,
          });
        }
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

// TODO: sign up => save => journal => logout and this does not work
  useEffect(() => {
    props.sendDataToParent(isLogout);
  }, [isLogout, props.sendDataToParent]);

  return (
    <>
      {isLoading && <Spinner />}
      <ToastContainer style={{ marginTop: "3em" }} />
      <button
        className="logout-button"
        onClick={handleLogout}
        style={{ marginRight: "1.5em" }}
      >
        Logout
      </button>
    </>
  );
}

export default Logout;
