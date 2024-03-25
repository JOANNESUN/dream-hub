import React, { useEffect, useState, useRef } from "react";
import "./LoginAndSignUp.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../Spinner/Spinner";

function Logout(props) {
  const [isLogout, setIsLogout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
        toast.success("You have logout successfully", {
          position: "top-right",
          autoClose: 2000,
          onClose: () => {
            localStorage.removeItem("token");
            setIsLogout(true);
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
