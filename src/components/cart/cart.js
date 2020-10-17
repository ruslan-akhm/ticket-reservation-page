import React, { useState, useContext } from "react";
import ticketService from "../../services/ticketService";
import { SeatsContext } from "../../context/seatsContext";
import "./cart.scss";

function Cart(){
  return(
  <div className="cart-icon">
     <a href="#"></a>
      <div className="cart-icon-popup">
        
      </div>
  </div>
  )
}

export default Cart;