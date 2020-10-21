import React, { useState, useContext } from "react";
//import ticketService from "../../services/ticketService";
import { SeatsContext } from "../../context/seatsContext";
import "./timer.scss";

function Timer(){
  
  //const {show, setShow} = useContext(SeatsContext);
  
  return(
  <div id="timer"><h1>Timer 05:00</h1></div>
  )
}

export default Timer;