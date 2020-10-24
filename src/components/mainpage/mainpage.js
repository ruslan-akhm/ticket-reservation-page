import React, { useState, useEffect, useContext } from "react";
import ticketService from "../../services/ticketService";
import Seats from "../seats/seats";
import { SeatsContext } from "../../context/seatsContext";
import "./mainpage.scss";

function Mainpage() {
  const { chosen, setChosen, secured, setSecured, timer, setTimer } = useContext(SeatsContext);

  useEffect(()=>{
    setTimer(10);
    setChosen([]);
    setSecured();
    updateSeats();
  },[])
  


  //this should probably be in seats.js
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
        <h2>STAGE</h2>
      </div>
      <Seats />
    </div>
  );
}

export default Mainpage;
