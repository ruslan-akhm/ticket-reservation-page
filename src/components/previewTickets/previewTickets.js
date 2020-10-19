import React, { useState, useContext, useEffect } from "react";
import ticketService from "../../services/ticketService";
import { SeatsContext } from "../../context/seatsContext";
import "./previewTickets.scss";

function Cart() {
  const { chosen, setChosen } = useContext(SeatsContext);

  useEffect(() => {
    console.log(chosen.length);
  }, []);

  return <div className="show-box"></div>;
}

export default Cart;
