import React, { useState, useEffect, useContext } from "react";
import ticketService from "../../services/ticketService";
import Poster from "../poster/poster";
import Seats from "../seats/seats";
import PreviewTickets from "../previewTickets/previewTickets";
import Spinner from "../loading/spinner";
import { SeatsContext } from "../../context/seatsContext";
import "./mainpage.scss";

function Mainpage() {
  const { chosen, setChosen } = useContext(SeatsContext);

  const [isLoaded, setIsLoaded] = useState(false);

  //update on render to see which seats were secured and chosen
  useEffect(() => {
    console.log("updating seats...");
    let seats = document.getElementsByClassName("check-box");
    ticketService.update().then(data => {
      if (sessionStorage.getItem("userId") == null) {
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
        let includes = chosen && chosen.some(x => x.id == seats[m].id);
        if (includes == true) {
          console.log(seats[m]);
          seats[m].disabled = false;
          seats[m].checked = true;
        }
      }
      setIsLoaded(true);
    });
  }, []);

  return (
    <div id="page">
      <Seats />
      {isLoaded ? null : (
        <div id="modal-loading">
          <Spinner />
        </div>
      )}
      <Poster />
      <PreviewTickets />
    </div>
  );
}

export default Mainpage;
