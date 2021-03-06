import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ticketService from "../../services/ticketService";
import { SeatsContext } from "../../context/seatsContext";
import "./timer.scss";

//TIMER RESETS AND STOPS ON REFRESH

function Timer() {
  const {
    chosen,
    setChosen,
    secured,
    setSecured,
    timer,
    setTimer
  } = useContext(SeatsContext);
  let history = useHistory();

  //handle timer reaching particular readings
  useEffect(() => {
    if (timer && timer <= 1) {
      console.log("TIMER is 0");
      setTimer(0);
      window.clearInterval(window.myInterval);
      clear();
      return
    }
    if (timer && timer < 31) {
      document.getElementById("countdown").style.color = "red";
    }
  }, [timer]);

  //tie timer to secured
  useEffect(() => {
    if (
      (!secured || secured.length < 0) &&
      sessionStorage.getItem("tickets") == null
    ) {
      console.log("removed all tickets");
      window.clearInterval(window.myInterval);
    }
  }, [secured]);

  const clear = () => {
    window.clearInterval(window.myInterval);
    const allSeats =
      secured &&
      secured.map(seat => {
        return seat.seat;
      });
    let seat = { ticket: [].concat(allSeats) };
    ticketService.unSecure(seat).then(data => {
      if (!data.error) {
        setSecured(null);
        setChosen([]);
        sessionStorage.removeItem("timer");
        sessionStorage.removeItem("tickets");
        history.push("/");
      }
    });
  };

  return (
    <div id="timer">
      <h3>
        You tickets have been secured. Please, finish your purchase within given time. You will have to start
        over otherwise
      </h3>
      {secured ? (
        <h1 id="countdown">
          0{Math.floor(timer / 60)}:{timer % 60 < 10 ? "0" : null}
          {timer % 60}
        </h1>
      ) : null}
    </div>
  );
}

export default Timer;

