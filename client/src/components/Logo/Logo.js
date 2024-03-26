import React from "react";
import "./Logo.css";
import logoImage from "../../assets/dream.png";
import { useSelector } from "react-redux";

const Logo = () => {
  const getUserName = useSelector((state) => state.userName.getUserName);
  return (
    <div className="logo-container">
      <img src={logoImage} alt="Logo" className="logoImage" />
      <div className="typewriter">Dream Hub</div>
      {getUserName && (
        <h5 style={{ marginTop: "10px", paddingLeft: "13px" }}>
          {getUserName}'s account
        </h5>
      )}
    </div>
  );
};

export default Logo;
