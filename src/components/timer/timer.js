import React, { useState, useContext, useEffect } from "react";

//import ticketService from "../../services/ticketService";
import { SeatsContext } from "../../context/seatsContext";
import "./timer.scss";

function Timer() {
  const { timer, setTimer } = useContext(SeatsContext);
  // const [minutes, setMinutes] = useState();
  // const [seconds, setSeconds] = useState();

  useEffect(() => {
    window.myInterval = setInterval(() => {
      setTimer(timer => timer - 1);
    }, 1000);
    return () => clearInterval(window.myInterval);
  }, []);

  useEffect(() => {
    if (timer < 1) {
      window.clearInterval(window.myInterval);
      console.log("API CALL HERE");
    }
  }, [timer]);

  return (
    <div id="timer">
      <h2>Please, finish your purchase within given time. You will have to start over otherwise</h2>
      <h1>
        0{Math.floor(timer / 60)}:{timer % 60 < 10 ? "0" : null}
        {timer % 60}
      </h1>
    </div>
  );
}

export default Timer;
