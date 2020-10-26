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
  useEffect(() => {
    // if (secured && secured.length > 0) {
    //   console.log("SOME TICKETS AND WE SET THE TIMER");
    //   setTimer(parseInt(localStorage.getItem("timer-count")) || 25);
    // }
    //  SO FAR THIS TO PREVENT INFINTE LOOP!!!!!!!!!!!!!!!!!!!!!!
    return()=>{
      setTimer(null)
    }
  }, []);

  //set timer to decrease every 1000ms
  // useEffect(() => {
  //   window.myInterval = setInterval(() => {
  //     console.log(timer);
  //     setTimer(timer => timer - 1);
  //   }, 1000);
  //   return () => {
  //     console.log("CLOSED PAGE BASICALLY")
  //     clear();
  //   };
  // }, []);

  useEffect(() => {
    // localStorage.setItem("timer-count", JSON.stringify(timer));
    if (timer < 1) {
      window.clearInterval(window.myInterval);
    //   localStorage.setItem("timer-count", JSON.stringify(null));
    //   //clear();
     }
  }, [timer]);

  useEffect(() => {
    if (!secured || secured.length < 0) {
      console.log("REMOVED ALL TICKETS");
      window.clearInterval(window.myInterval);
    }
  }, [secured]);

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
      {secured ? (
        <h1>
          0{Math.floor(timer / 60)}:{timer % 60 < 10 ? "0" : null}
          {timer % 60}
        </h1>
      ) : null}
    </div>
  );
}

export default Timer;
