import React, { useState, useContext, useEffect } from "react";
import Spinner from "./spinner"
import "./loading.scss";

function Loading(props) {
  
  useEffect(() => {
    if (props.isLoading) {
      document.getElementById("loading-modal").style.display = "flex";
      //if(props.message){
      //  console.log(props.message)
      //}
    } else {
      document.getElementById("loading-modal").style.display = "none";
    }
  }, [props]);

  return (
    <div id="loading-modal">
      <div id="loading-box">
        <Spinner />
      {/*   <div id="loading-animation">
          <div className="spinner-1"></div>
        </div> */}
        <h1>We are securing your tickets...</h1>
      </div>
    </div>
  );
}

export default Loading;
