import React, { useState, useContext } from "react";
import ticketService from "../../services/ticketService";
import { SeatsContext } from "../../context/seatsContext";
import "./poster.scss";

function Poster(){
  return(
  <div className="show-box">
      <p>Show: Cirque Du Soleil</p>
      <p>Location: Sony Centre, Toronto, ON</p>
      <p>Date: Sep, 20, 2021, 6.30pm</p>
  </div>
  )
}

export default Poster;