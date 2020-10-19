import React, { useState, useContext, useEffect } from "react";
import "./loading.scss";

function Loading(props) {
  
  useEffect(() => {
    if (props.isLoading) {
      document.getElementById("loading-modal").style.display = "flex";
    } else {
      document.getElementById("loading-modal").style.display = "none";
    }
  }, [props]);

  return (
    <div id="loading-modal">
      <div id="loading-box">
        <h1>We are securing your tickets...</h1>
        <div id="loading-animation">
          <div className="spinner-1"></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
