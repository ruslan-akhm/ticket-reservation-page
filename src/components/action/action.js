import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import ticketService from "../../services/ticketService";
import { SeatsContext } from "../../context/seatsContext";
import "./action.scss";

function Action() {
  const { chosen, setChosen, secured, setSecured, show, setShow, timer, setTimer } = useContext(
    SeatsContext
  );
  let history = useHistory();

  const cancel = () => {
    if(!secured || secured.length<1){
      return history.push("/");
    }
    const allSeats = secured.map(seat => {
      return seat.seat;
    });
    let userId = sessionStorage.getItem("userId")
    let seat = { ticket: [].concat(allSeats), userId: userId };
    ticketService.unSecure(seat).then(data => {
      console.log(data);
      if (!data.error) {
        setSecured(null);
        setChosen([]);
        sessionStorage.removeItem("timer")
        sessionStorage.removeItem("tickets")//, JSON.stringify(null));
        history.push("/");
      }
    });
  };

  const proceed = () => {
    //basically can use <a> -
    //href user to "/purchase"
  };

  return (
    <div id="action-btns">
      <button onClick={cancel}>&#8592; Cancel</button>
      <button onClick={proceed}>Purchase &#8594;</button>
    </div>
  );
}

export default Action;
