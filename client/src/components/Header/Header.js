import React, {useState} from "react";
import "./Header.css";
import getDate from "../../helper/date";
import Logo from "../Logo/Logo.js";
function Header() {
  const [currentDate, setCurrentDate] = useState(getDate());
  return (
    <div className="header">
      <ul style={{color: "white"}}>{currentDate}</ul>
      <Logo />
    </div>
  );
}

export default Header;
