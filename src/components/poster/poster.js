import React, { useState, useContext } from "react";
import ticketService from "../../services/ticketService";
import { SeatsContext } from "../../context/seatsContext";
import "./poster.scss";

function Poster(){
  
  const {show, setShow} = useContext(SeatsContext);
  
  return(
  <div className="show-box">
      <p><span>Show: </span>{show.performer}</p>
      <p>Location: {show.stage}, {show.location}</p>
      <p>Date: {show.date}, {show.time}</p>
  </div>
  )
}

export default Poster;