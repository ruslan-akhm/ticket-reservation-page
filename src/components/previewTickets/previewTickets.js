import React, { useState, useContext, useEffect } from "react";
import Loading from "./loading/loading"
import ticketService from "../../services/ticketService";
import { SeatsContext } from "../../context/seatsContext";
import "./previewTickets.scss";

function PreviewTickets() {
  const { chosen, setChosen, secured, setSecured } = useContext(SeatsContext);
  const [loading, setLoading] = useState(false);

  const secureTickets = () => {
    setSecured(chosen);
  };

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
      {chosen.length > 0 ? (
        <a href="/cart" onClick={secureTickets}>
          Next
        </a>
      ) : null}
      <Loadng isLoading={loading} />
    </div>
  );
}

export default PreviewTickets;
