import React from "react";
import "./Logo.css";

const Logo = (props) => {
  return (
    <div className="logo-container">
      {props.username ? (
        <>
          {props.username}'s  &nbsp;
          <div className="typewriter">Dream Hub</div>
        </>
      ) : (
        <div className="typewriter">Dream Hub</div>
      )}
    </div>
  );
};

export default Logo;
