import React, { useState, useContext, useEffect } from "react";
import ticketService from "../../services/ticketService";
import { SeatsContext } from "../../context/seatsContext";
import "./cart.scss";

function Cart() {
  const { chosen, setChosen, secured, setSecured } = useContext(SeatsContext);
  //const {secured, setSecured} =

  useEffect(() => {
    console.log(chosen.length);
  }, []);
  
  let ticket = [];
      
  return (
    <div id="cart">
      <div>HELLO</div>
    </div>
  );
}

export default Cart;
