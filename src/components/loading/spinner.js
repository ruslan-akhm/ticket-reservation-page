import React, { useState, useContext, useEffect } from "react";
import "./loading.scss";

function Spinner(props) {
  // useEffect(() => {
  //   if (props.isLoading) {
  //     document.getElementById("loading-modal").style.display = "flex";
  //     //if(props.message){
  //     //  console.log(props.message)
  //     //}
  //   } else {
  //     document.getElementById("loading-modal").style.display = "none";
  //   }
  // }, [props]);

  return (
    <div id="loading-animation">
      <div className="spinner-1"></div>
    </div>
  );
}

export default Spinner;
