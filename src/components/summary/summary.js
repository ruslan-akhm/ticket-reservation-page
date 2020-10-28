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
  
  const totalCost = chosen.map(ticket=>parseInt(ticket.price)).reduce((acc,val)=>acc+val) 

  return (
    <div id="summary" className={"summary-"+styles}>
      <p>{}</p>
    </div>
  );
}

export default Summary;
