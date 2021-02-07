import React, { useState, useContext } from "react";
import ticketService from "../../services/ticketService";
import { SeatsContext } from "../../context/seatsContext";
import "./poster.scss";

function Poster() {
  const { show } = useContext(SeatsContext);

  return (
    <div id="poster">
      <h3>{show.performer}</h3>
      <ul className="show-box">
        <li>&nbsp;{show.date}</li>
        <li>&nbsp;{show.time}</li>
        <li>&nbsp;{show.stage}</li>
        <li>&nbsp;{show.location}</li>
      </ul>
    </div>
  );
}

export default Poster;
