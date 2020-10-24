import React, { useState, useContext } from "react";
import ticketService from "../../services/ticketService";
import { SeatsContext } from "../../context/seatsContext";
import "./action.scss";

function Action() {
 const { chosen, setChosen, secured, setSecured, show, setShow } = useContext(
    SeatsContext
  );

  const cancel = () =>{
    const allSeats = secured.map(seat=>{return seat.seat})
    let seat = { ticket: [].concat(allSeats) };
    ticketService.unSecure(seat).then(data=>{
      console.log(data);
      if (!data.error) {
        setSecured(null);
        setChosen([]);
        localStorage.setItem("tickets", JSON.stringify(null));
        if (!filteredTickets || filteredTickets.length < 1) {
          history.push("/");
        }
      }
    })
    //api call to remove these tickets from isSecured +
    //when data received back : 
    //remove everything from chosen, secured, localstorage
    //history.push("/")  
  }
  
  const proceed=()=>{
    //basically can use <a> - 
    //href user to "/purchase"
  }
  
  return (
    <div id="action-btns">
      <button onClick={cancel}>&#8592; Cancel</button>
      <button onClick={proceed}>Purchase &#8594;</button>
    </div>
  );
}

export default Action;
