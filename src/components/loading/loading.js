import React, { useEffect } from "react";
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
        <h2>We are securing your tickets...</h2>
      </div>
    </div>
  );
}

export default Loading;
