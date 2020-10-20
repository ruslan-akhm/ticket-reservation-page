import React, { useState, useContext, useEffect } from "react";
import ticketService from "../../services/ticketService";
import { SeatsContext } from "../../context/seatsContext";
import "./cart.scss";

function Cart() {
  const { chosen, setChosen, secured, setSecured, show, setShow } = useContext(
    SeatsContext
  );
  //const {secured, setSecured} =

  useEffect(() => {
    console.log(chosen.length);
  }, []);

  let tickets =
    secured &&
    secured.map(ticket => {
      return (
        <li>
          <h2>{ticket.seat}</h2>
          <p>{ticket.price}</p>
          <p>Show: {show.performer}</p>
          <p>
            Location: {show.stage}, {show.location}
          </p>
          <p>
            Date: {show.date}, {show.time}
          </p>
        </li>
      );
    });

  return (
    <div id="cart">
      <div id="timer"></div>
      <div className="ticket-box">
        <ul>{tickets}</ul>
      </div>
    </div>
  );
}

export default Cart;
