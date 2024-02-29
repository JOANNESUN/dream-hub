// Loader.js
import React from 'react';
import './Loader.css'; 

const Loader = () => {
  return (
    <div>
      <div className="loader loader--2">
        <div className="dot">
          <div className="face">
            <div className="eyes"></div>
            <div className="mouth"></div>
          </div>
        </div>
        <div className="shadow"></div>
        <h1 className="oxygenBold" style={{marginTop:"1em"}}>Analyzing...</h1>
      </div>
    </div>
  );
};

export default Loader;
