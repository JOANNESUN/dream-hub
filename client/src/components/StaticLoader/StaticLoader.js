import React from "react";
import './StaticLoader.css';

function StaticLoader(){
    return (
        <div className="loader">
        <div className="static-dot">
          <div className="face">
            <div className="eyes"></div>
          </div>
        </div>
        <div className="static-shadow"></div>
      </div>
    )
};

export default StaticLoader;