import React, { useState, useContext, useEffect } from "react";
import "./loading.scss";

function Spinner(props) {
  return (
    <div
      id="loading-animation"
      className={props.caller == "checkout" ? "checkout-loading" : null}
    >
      <div className="spinner-1"></div>
    </div>
  );
}

export default Spinner;
