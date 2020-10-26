import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../loading/loading";
import ticketService from "../../services/ticketService";
import { SeatsContext } from "../../context/seatsContext";
import "./previewTickets.scss";

function PreviewTickets() {
  const { chosen, setChosen, secured, setSecured } = useContext(SeatsContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  let history = useHistory();
  
  useEffect(()=>{
    document.getElementById("preview-box").scrollTop = document.getElementById("preview-box").scrollHeight || 0;
  },[chosen])

  const secureTickets = e => {
    e.preventDefault();
    setLoading(true);
    let allSeats = document.getElementsByClassName("check-box");
    // for (let m = 0; m < allSeats.length; m++) {
    //   let includes = chosen.some(x => x.seat == allSeats[m].id);
    //   if (includes == true) {
    //     console.log(allSeats[m]);
    //     allSeats[m].checked = true;
    //   }
    // }
    let userId = localStorage.getItem("userId")
    let seats = { seats: chosen, userId: userId };
    console.log(seats);
    ticketService.secure(seats).then(data => {
      console.log(data);
      if (data.error) {
      }
      if (data.secured) {
        setLoading(false);
        setSecured(chosen);
        console.log(chosen);
        localStorage.setItem("tickets", JSON.stringify(chosen));
        history.push("/cart");
      }
    });
  };

  let preview =
    chosen &&
    chosen.map((ticket, index) => {
      return (
        <div key={index} className="preview">
          <h2>Seat: {ticket.seat}</h2>
          <h5>Price: ${ticket.price}</h5>
        </div>
      );
    });

  return (
    <div id="preview-box">
      <ul>{preview}</ul>
      {chosen.length > 0 ? (
        <a href="" onClick={secureTickets}>
          Next
        </a>
      ) : null}
      <Loading isLoading={loading} message={message} />
    </div>
  );
}

export default PreviewTickets;
