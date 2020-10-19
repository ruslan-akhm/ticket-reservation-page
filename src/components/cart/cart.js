import React, { useState, useContext, useEffect } from "react";
import ticketService from "../../services/ticketService";
import { SeatsContext } from "../../context/seatsContext";
import "./cart.scss";

function Cart(){
  
  const {chosen, setChosen} = useContext(SeatsContext);
  
  useEffect(()=>{
    console.log(chosen.length)
  },[])
  
  return(
  <div className="cart-icon">
     <a href="#"></a>
      
      {/* {chosen && chosen.length>0?(<div className="cart-icon-popup">{chosen.length}</div>):null}  */}
      
  </div>
  )
}

export default Cart;