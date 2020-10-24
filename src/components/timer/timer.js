import React, { useState, useContext, useEffect } from "react";
//import ticketService from "../../services/ticketService";
import { SeatsContext } from "../../context/seatsContext";
import "./timer.scss";

function Timer(){
  
  const {timer, setTimer} = useContext(SeatsContext);
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  
  useEffect(()=>{
    console.log(timer%60);
    setMinutes(Math.floor(timer/60));
    setSeconds(timer%60);
    const interval = setInterval(() => {
    // console.log('This will run every second!');
      setTimer(timer=>timer-1);
    }, 1000);
    return () => clearInterval(interval);
  },[])//[timer] ??
  
  //let time;
  
  return(
  <div id="timer"><h1>{minutes}, {seconds}</h1></div>
  )
}

export default Timer;