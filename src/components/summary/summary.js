import React, { useState, useEffect, useContext } from "react";
//import ticketService from "../../services/ticketService";
import { SeatsContext } from "../../context/seatsContext";
import "./summary.scss";

function Summary(props) {
  const { chosen, setChosen, secured, setSecured } = useContext(SeatsContext);
  const [styles, setStyles] = useState();
  const [tickets, setTickets] = useState();
  
  useEffect(()=>{
    setStyles(props.caller)
    if(props.caller=="preview"){
      setTickets(chosen)
    }
    else if(props.caller=="cart"){
      setTickets(secured)
    }
  },[props])
  
  const totalCost = tickets && tickets.map(ticket=>parseInt(ticket.price)).reduce((acc,val)=>{return acc+val},0) 

  return (
    <div id="summary" className={"summary-"+styles}>
      <p>Tickets: ${totalCost}, plus Service Fee: $10</p>
      <p>Your Subtotal: ${totalCost+10}, including taxes</p>
    </div>
  );
}

export default Summary;
