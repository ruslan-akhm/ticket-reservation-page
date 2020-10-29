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
  const [message, setMessage] = useState();
  let history = useHistory();

  //auto scroll down when choosing multiple tickets
  useEffect(() => {
    if (window.innerWidth <= 800) {
      return;
    }
    document.getElementById("preview-box").scrollTop =
      document.getElementById("preview-box").scrollHeight || 0;
  }, [chosen]);

  const secureTickets = e => {
    e.preventDefault();
    setLoading(true);
    setTimer(300);
    let allSeats = document.getElementsByClassName("check-box");
    let userId = sessionStorage.getItem("userId");
    let seats = { seats: chosen, userId: userId };
    ticketService.secure(seats).then(data => {
      if (data.error) {
        //if tickets chosen were secured by smb else in the meanwhile
        //alert message
        //setChosen([]);
        //force refresh
      }
      if (data.secured) {
        setLoading(false);
        setSecured(chosen);
        //console.log(chosen)
        sessionStorage.setItem("tickets", JSON.stringify(chosen)); //sessionstor?
        //console.log(sessionStorage.getItem("tickets"))
        history.push("/cart");
      }
    });
  };

  let preview =
    chosen &&
    chosen.map((ticket, index) => {
      return (
        <div key={index} className="preview">
          <h2>Row:{ticket.row}</h2><h2>Seat:{ticket.seat}</h2></ul>
          <h4>{ticket.type} Ticket</h4>
          <h5>Price: ${ticket.price}</h5>
          <span> + service fees, including taxes</span>
        </div>
      );
    });

  return (
    <div id="preview-box">
      <ul>{preview}</ul>
      {chosen && chosen.length > 0 ? (
        <>
          <Summary caller="preview" />
          <a href="" onClick={secureTickets}>
            Next
          </a>
        </>
      ) : null}
      <Loading isLoading={loading} message={message} />
    </div>
  );
}

export default PreviewTickets;
