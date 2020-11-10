import React, { useState, useContext, useEffect } from "react";
import Spinner from "./spinner";
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
        <Spinner />
        <h1>We are securing your tickets...</h1>
      </div>
    </div>
  );
}

export default Loading;
