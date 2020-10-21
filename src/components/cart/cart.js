import React, { useState, useContext, useEffect } from "react";
import ticketService from "../../services/ticketService";
import { SeatsContext } from "../../context/seatsContext";
import "./cart.scss";

//timer to be 5 min. if not purchased || tab closed -> componentwillunmount -> remove timer and send API call to unsecure tickets
//if all removed (re - setChosen when remove tickets) and length==0 -> redirect to mainpage
//cancel button to make same API call as in 1st step (unsecure tickets)
//isPaid, setIsPaid -> is being set on payment page -> API call to make isTaken true

function Cart() {
  const { chosen, setChosen, secured, setSecured, show, setShow } = useContext(
    SeatsContext
  );

  useEffect(() => {
    console.log(chosen.length);
     console.log(secured)
    if (!secured || secured.length == 0) {
      console.log("NO SECURED - REFERSH HAPPENED")
      setSecured(JSON.parse(localStorage.getItem("tickets")))
      return; 
    }
  }, [secured]);
  
  const removeTicket = (ticket)=>{
    console.log(ticket);
    let filteredTickets = secured.filter(seat=>{
      return seat.seat!=ticket
    })
    setSecured(filteredTickets)
   
  }

  let tickets =
    secured &&
    secured.map(ticket => {
      return (
        <li>
          <div className="ticket">
            <p>{show.performer}</p>
            <p>
              {show.stage}, {show.location}
            </p>
            <p>
              {show.date}, {show.time}
            </p>
            <h2>{ticket.seat}</h2>
            <p>{ticket.price}</p>
          </div>
          <div className="ticket-side">
            <p>{show.performer}</p>
            <h2>{ticket.seat}</h2>
          </div>
          <button className="btn-remove" onClick={e=>removeTicket(ticket.seat)}>- REMOVE</button>
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
