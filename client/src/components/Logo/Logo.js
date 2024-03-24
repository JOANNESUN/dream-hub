import React from "react";
import "./Logo.css";
import logoImage from "../../assets/dream.png";

const Logo = (props) => {
  return (
    <div className="logo-container">
      <img src={logoImage} alt="Logo" className="logoImage"/>
      {props.username && window.innerWidth > 768 && (
        <>{props.username}'s &nbsp;</>
      )}
      <div className="typewriter">Dream Hub</div>
    </div>
  );
};

export default Logo;
