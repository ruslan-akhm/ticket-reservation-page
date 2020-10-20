import React, { useState, useEffect, useContext } from "react";
import ticketService from "../../services/ticketService";
import Seats from "../seats/seats";
import Cart from "../cart/cart";
//import Checker from './components/checker'
//import Message from './components/message'
import { SeatsContext } from "../../context/seatsContext";
import "./mainpage.scss";

function Mainpage() {
  const { message, setMessage } = useContext(SeatsContext);

  useEffect(() => {
    updateSeats();
  }, [message]);

  const updateSeats = () => {
    let seats = document.getElementsByClassName("check-box");
    //prevent double reservation of the same seats if "Reserve" clicked more than once in a row
    for (let m = 0; m < seats.length; m++) {
      seats[m].checked = false;
    }
    ticketService.update().then(data => {
      let taken = data.seats;
      for (let j = 0; j < seats.length; j++) {
        taken.map(t => {
          return t == seats[j].value ? (seats[j].disabled = true) : null;
        });
      }
    });
  };

  return (
    <div id="page">
      <div id="stage">
        <h1>STAGE/SCREEN</h1>
      </div>
      <Seats />
     {/* <Cart /> */}
      
    </div>
  );
}

export default Mainpage;