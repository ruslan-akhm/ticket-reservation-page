import React, { useState, useContext, useEffect } from "react";
import ticketService from "../../services/ticketService";
import { SeatsContext } from "../../context/seatsContext";
import "./previewTickets.scss";

function Cart() {
  const { chosen, setChosen } = useContext(SeatsContext);

  useEffect(() => {
    console.log(chosen.length);
  }, [chosen]);

  let preview =
    chosen &&
    chosen.map(ticket => {
      return (
        <div className="preview">
          <h2>{ticket.seat}</h2>
          <p>{ticket.price}</p>
        </div>
      );
    });

  return (
    <div className="show-box">
      <ul>{preview}</ul>
    </div>
  );
}

export default Cart;
