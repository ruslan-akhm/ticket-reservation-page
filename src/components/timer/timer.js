import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ticketService from "../../services/ticketService";
import { SeatsContext } from "../../context/seatsContext";
import "./timer.scss";

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
  // const [minutes, setMinutes] = useState();
  // const [seconds, setSeconds] = useState();

  useEffect(() => {
    if (!secured || secured.length < 0) {
      window.clearInterval(window.myInterval);
      return;
    }
    window.myInterval = setInterval(() => {
      setTimer(timer => timer - 1);
    }, 1000);
    return () => {
      // console.log("CLEARING");
      //clearInterval(window.myInterval);
      clear();
    };
  }, []);

  useEffect(() => {
    if (timer < 1) {
      clear();
      // window.clearInterval(window.myInterval);
      // const allSeats = secured.map(seat => {
      //   return seat.seat;
      // });
      // let seat = { ticket: [].concat(allSeats) };
      // ticketService.unSecure(seat).then(data => {
      //   if (!data.error) {
      //     setSecured(null);
      //     setChosen([]);
      //     localStorage.setItem("tickets", JSON.stringify(null));
      //     history.push("/");
      //   }
      // });
    }
  }, [timer]);

  const clear = () => {
    window.clearInterval(window.myInterval);
    const allSeats = secured.map(seat => {
      return seat.seat;
    });
    let seat = { ticket: [].concat(allSeats) };
    ticketService.unSecure(seat).then(data => {
      if (!data.error) {
        setSecured(null);
        setChosen([]);
        localStorage.setItem("tickets", JSON.stringify(null));
        history.push("/");
      }
    });
  };

  return (
    <div id="timer">
      <h3>
        Please, finish your purchase within given time. You will have to start
        over otherwise
      </h3>
      <h1>
        0{Math.floor(timer / 60)}:{timer % 60 < 10 ? "0" : null}
        {timer % 60}
      </h1>
    </div>
  );
}

export default Timer;
