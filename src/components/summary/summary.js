import React, { useState, useEffect, useContext } from "react";
//import ticketService from "../../services/ticketService";
import { SeatsContext } from "../../context/seatsContext";
import "./summary.scss";

function Summary(props) {
  const { chosen, setChosen } = useContext(SeatsContext);
  const [styles, setStyles] = useState();
  
  useEffect(()=>{
    setStyles(props.caller)
  },[props])
  
  const totalCost = chosen && chosen.map(ticket=>parseInt(ticket.price)).reduce((acc,val)=>{return acc+val},0) 

  return (
    <div id="summary" className={"summary-"+styles}>
      <p>Tickets: ${totalCost}, plus Service Fee: $10</p>
      <p>Your Subtotal: ${totalCost+10}</p>
    </div>
  );
}

export default Summary;
