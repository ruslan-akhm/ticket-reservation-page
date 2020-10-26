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
  
  //setTimer initially - if returned to this page, then from localstorage
  //if visiting 1st time - initial value
  useEffect(()=>{
    setTimer(parseInt(localStorage.getItem("timer-count"))||25);
  },[])
  
  //set timer to decrease every 1000ms
  useEffect(() => {
    if (!secured || secured.length < 0) {
      window.clearInterval(window.myInterval);
      return;
    }
    window.myInterval = setInterval(() => {
      console.log(timer);
      setTimer(timer => timer - 1);
    }, 1000);
    return () => {
      clear();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("timer-count", JSON.stringify(timer));
    if (timer < 1) {
      localStorage.setItem("timer-count", JSON.stringify(null));
      clear();
    }
  }, [timer]);

  //if timer reaches 00:00 or page is closed -> clear states and localstorage, unsecure tickets on back-end
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
        //localStorage.setItem("timer-count", JSON.stringify(null));
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
