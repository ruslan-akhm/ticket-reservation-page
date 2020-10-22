import React, { useState, useContext } from "react";
//import ticketService from "../../services/ticketService";
import { SeatsContext } from "../../context/seatsContext";
import "./action.scss";

function Action() {
  //const {show, setShow} = useContext(SeatsContext);

  return (
    <div>
      <button>Cancel</button>
      <button>Purchase</button>
    </div>
  );
}

export default Action;
