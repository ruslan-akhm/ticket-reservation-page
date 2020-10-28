import React, { useState, useContext } from "react";
import ticketService from "../../services/ticketService";
import { SeatsContext } from "../../context/seatsContext";
import "./poster.scss";

function Poster() {
  const { show, setShow } = useContext(SeatsContext);

  return (
    <div className="show-box">
      <div className="show-image">
        <img src="https://cdn.glitch.com/3eeb3b2b-1bb2-49a0-811f-d94dbc022a91%2FCircus-logo.jpg?v=1603851496387" />
      </div>
      <div className="show-description">
        <p>{show.performer}</p>
        <p>
          &nbsp;{show.stage}, {show.location}
        </p>
        <p>
          &nbsp;{show.date}, {show.time}
        </p>
      </div>
    </div>
  );
}

export default Poster;
