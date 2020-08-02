import React, { useState, useEffect } from 'react';
import ticketService from './services/ticketService'
import Seats from './components/seats'
import Checker from './components/checker'
import Message from './components/message'
import './App.css';

function App(){

  useEffect(()=>{
    updateSeats();
  },[])
  
  const updateSeats=()=>{
    let seats = document.getElementsByClassName('check-box');
    for(let m=0; m<seats.length; m++){
      seats[m].checked=false;
      seats[m].disabled=false;
    }
    ticketService.update().then(data=>{
      let taken = data.seats;
      for(let j=0;j<seats.length;j++){
        taken.map(t=>{
          return t==seats[j].value?seats[j].disabled=true:null;
        })
      }
    })
  }
  
    return(
      <div id="page">
        <div id="stage">STAGE/SCREEN</div>
        <Seats />
        <Message />
        <Checker />
      </div>
    )
  
}

export default App;
