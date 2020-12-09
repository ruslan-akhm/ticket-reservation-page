import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../loading/loading";
import Summary from "../summary/summary";
import ticketService from "../../services/ticketService";
import { SeatsContext } from "../../context/seatsContext";
import "./previewTickets.scss";

function PreviewTickets() {
  const {
    chosen,
    setChosen,
    secured,
    setSecured,
    timer,
    setTimer
  } = useContext(SeatsContext);
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  const secureTickets = e => {
    e.preventDefault();
    setLoading(true);
    setTimer(300);
    let allSeats = document.getElementsByClassName("check-box");
    let userId = sessionStorage.getItem("userId");
    let seats = { seats: chosen, userId: userId };
    ticketService.secure(seats).then(data => {
      if (data.secured) {
        setLoading(false);
        setSecured(chosen);
        sessionStorage.setItem("tickets", JSON.stringify(chosen)); //sessionstor?
        history.push("/cart");
      }
    });
  };

  return (
    <div id="preview-box">
      {chosen && chosen.length > 0 ? (
        <div className="preview-summary">
          <Summary caller="preview" />
          <a href="" onClick={secureTickets}>
            Next
          </a>
        </div>
      ) : null}
      <Loading isLoading={loading} />
    </div>
  );
}

export default PreviewTickets;

