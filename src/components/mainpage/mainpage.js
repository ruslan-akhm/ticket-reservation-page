import React, { useState, useEffect, useContext } from "react";
import ticketService from "../../services/ticketService";
import Poster from "../poster/poster";
import Seats from "../seats/seats";
import PreviewTickets from "../previewTickets/previewTickets";
import { SeatsContext } from "../../context/seatsContext";
import "./mainpage.scss";

function Mainpage() {
  const {
    chosen,
    setChosen,
    secured,
    setSecured,
    timer,
    setTimer
  } = useContext(SeatsContext);

  useEffect(() => {
    // setChosen([]);
    // setSecured();
    updateSeats();
    return () => {
      //localStorage.clear()
      //RESET SECURED HERE
      //TRY WITH CONSOLING ON BACK END FIRST
    };
  }, []);

  //this should probably be in seats.js
  const updateSeats = () => {
    let seats = document.getElementsByClassName("check-box");

    // for (let m = 0; m < seats.length; m++) {
    //   seats[m].checked = false;
    // }
    ticketService.update().then(data => {
      console.log(sessionStorage.getItem("userId"));
      if (sessionStorage.getItem("userId") == null) {
        console.log("GETTING ID");
        sessionStorage.setItem("userId", data.userId); //set user id to manipulate their tickets
      }
      let taken = data.seats;
      for (let j = 0; j < seats.length; j++) {
        taken.map(t => {
          return t == seats[j].value ? (seats[j].disabled = true) : null;
        });
      }
      //if we return back via browser "back" button - show us our seats chosen (they are still secured)
      for (let m = 0; m < seats.length; m++) {
        let includes = chosen && chosen.some(x => x.seat == seats[m].id);
        if (includes == true) {
          console.log(seats[m]);
          seats[m].disabled = false;
          seats[m].checked = true;
        }
      }
    });
  };

  return (
    <div id="page">
      <div id="poster">
        <Poster />
      </div>
      <div id="side-left">
        <div id="stage">
          <h2>STAGE</h2>
        </div>
        <Seats />
      </div>
      <div id="side-right">
        <PreviewTickets />
      </div>
    </div>
  );
}

export default Mainpage;
