// import React, { useState, useEffect, useContext } from "react";
// import ticketService from "./services/ticketService";
// import Seats from "./components/seats/seats";
// import Cart from "./components/cart/cart";
// //import Checker from './components/checker'
// //import Message from './components/message'
// import { SeatsContext } from "./context/seatsContext";
// import "./App.css";

// function App() {
//   const { message, setMessage } = useContext(SeatsContext);

//   useEffect(() => {
//     updateSeats();
//   }, [message]);

//   const updateSeats = () => {
//     let seats = document.getElementsByClassName("check-box");
//     //prevent double reservation of the same seats if "Reserve" clicked more than once in a row
//     for (let m = 0; m < seats.length; m++) {
//       seats[m].checked = false;
//     }
//     ticketService.update().then(data => {
//       let taken = data.seats;
//       for (let j = 0; j < seats.length; j++) {
//         taken.map(t => {
//           return t == seats[j].value ? (seats[j].disabled = true) : null;
//         });
//       }
//     });
//   };

//   return (
//     <div id="page">
//       <div id="stage">
//         <h1>STAGE/SCREEN</h1>
//       </div>
//       <Seats />
//       <Cart />

//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SeatsContext } from "./context/seatsContext";
import Mainpage from "./components/mainpage/mainpage";
import Cart from "./components/cart/cart";
import "./App.css";

function App() {
  
  const { timer, setTimer } = useContext(SeatsContext);
  
  useEffect(()=>{
    return () => {
      console.log("CLOSED PAGE BASICALLY");
      //has to clear [timer] and localstorage for "timer-count"
      //clear();
    };
  },[])

  useEffect(() => {
    console.log("SHOULD ONLY TURN ON WHEN TIMER IS SET")
    localStorage.setItem("timer-count", JSON.stringify(timer));
    window.myInterval = setInterval(() => {
      setTimer(timer => timer - 1);
    }, 1000);
    
  }, [timer]);

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Mainpage} />
        <Route path="/cart" exact component={Cart} />
        {/*  <Route path="*" exact component={PageNotFound} /> */}
      </Switch>
    </Router>
  );
}

export default App;
