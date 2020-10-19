import React, { useState, useContext, useEffect } from "react";
import ticketService from "../../services/ticketService";
import { SeatsContext } from "../../context/seatsContext";
import "./previewTickets.scss";

function PreviewTickets() {
  const { chosen, setChosen } = useContext(SeatsContext);

  useEffect(() => {
    console.log('OKAY');
  }, []);

  let preview =
    chosen &&
    chosen.map(ticket => {
      return (
        <div className="preview">
          <h2>Seat: {ticket.seat}</h2>
          <p>Price: {ticket.price}</p>
        </div>
      );
    });

  return (
    <div className="preview-box">
      <ul>{preview}</ul>
      {chosen.length>0?<a href="*">Next</a>:null}
    </div>
  );
}

export default PreviewTickets;
