import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Timer from "../timer/timer";
import Summary from "../summary/summary";
import Action from "../action/action";
import ticketService from "../../services/ticketService";
import { SeatsContext } from "../../context/seatsContext";
import "./cart.scss";

//when seat is secured - disable it+
//timer to be 5 min. if not purchased || tab closed -> componentwillunmount -> remove timer and send API call to unsecure tickets!+
//if all removed (re - setChosen when remove tickets) and length==0 -> redirect to mainpage+
//cancel button to make same API call as in 1st step (unsecure tickets)+
//isPaid, setIsPaid -> is being set on payment page -> API call to make isTaken true

//tickets have to be unsecured if not paid and page is closed

function Cart() {
  const {
    chosen,
    setChosen,
    secured,
    setSecured,
    show,
    setShow,
    timer,
    setTimer
  } = useContext(SeatsContext);
  let history = useHistory();

  //if refresh page - reset states from sessionstorage
  useEffect(() => {
    if (!secured || secured.length == 0) {
      setSecured(JSON.parse(sessionStorage.getItem("tickets")));
      setChosen(JSON.parse(sessionStorage.getItem("tickets")));
    }
    if (!timer) {
      setTimer(JSON.parse(sessionStorage.getItem("timer")));
    }
  }, []);

  const removeTicket = ticket => {
    let filteredTickets = secured.filter(seat => {
      return seat.seat != ticket;
    });
    let seat = { ticket: [ticket] };
    ticketService.unSecure(seat).then(data => {
      console.log(data);
      if (!data.error) {
        setSecured(filteredTickets);
        setChosen(filteredTickets);
        sessionStorage.setItem("tickets", JSON.stringify(filteredTickets));
        if (!filteredTickets || filteredTickets.length < 1) {
          setSecured(null);
          setTimer(0);
          sessionStorage.removeItem("tickets");
          sessionStorage.removeItem("timer");
          history.push("/");
        }
      }
    });
  };

  let tickets =
    secured &&
    secured.map(ticket => {
      return (
        <li>
          <div className="ticket">
            <div className="ticket-main">
              <h2>{show.performer}</h2>
              <p>
                {show.stage}, {show.location}
              </p>
              <p>
                {show.date}, {show.time}
              </p>
              <p>{ticket.type} Ticket</p>
              <h1>SEAT: {ticket.seat}</h1>
            </div>
            <div className="ticket-side">
              <h2>{show.performer}</h2>
              <h1>{ticket.seat}</h1>
            </div>
          </div>
          <div className="remove">
            <h2>${ticket.price}</h2>
            <button
              className="btn-remove"
              onClick={e => removeTicket(ticket.seat)}
            >
              REMOVE
            </button>
          </div>
        </li>
      );
    });

  //const totalCost = secured && (secured.map(item=>{return parseInt(item.price)}).reduce((acc, val)=>{return acc+val},0))

  return (
    <div id="cart">
      <Timer />
      <div className="ticket-box">
        <h1>Verify your tickets</h1>
        <ul>{tickets}</ul>
        {!secured || secured.length < 1 ? (
          <span>No tickets chosen...</span>
        ) : (
          <Summary caller="cart" />
        )}
      </div>
      {!secured || secured.length < 1 ? null : <Action />}
    </div>
  );
}

export default Cart;
