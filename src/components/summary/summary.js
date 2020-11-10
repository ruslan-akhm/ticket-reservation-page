import React, { useState, useEffect, useContext } from "react";
import { SeatsContext } from "../../context/seatsContext";
import "./summary.scss";

function Summary(props) {
  const { chosen, setChosen, secured, setSecured, total, setTotal } = useContext(SeatsContext);
  const [styles, setStyles] = useState();
  const [tickets, setTickets] = useState();
  let fee = 10;
  
  //show information based on component calling this function
  useEffect(()=>{
    setStyles(props.caller)
    if(props.caller=="preview"){
      setTickets(chosen)
    }
    else if(props.caller=="cart"){
      setTickets(secured)
    }
  },[props])
  
  useEffect(()=>{
    setTotal(totalCost && (totalCost+fee))
  },[tickets])
  
  const totalCost = tickets && tickets.map(ticket=>parseInt(ticket.price)).reduce((acc,val)=>{return acc+val},0) 

  return (
    <div id="summary" className={"summary-"+styles}>
      <p>Tickets: ${totalCost}, plus Service Fee: $10</p>
      <p>Your Subtotal: ${totalCost+fee}, including taxes</p>
    </div>
  );
}

export default Summary;
