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

import React, { useState, useEffect, useContext, useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SeatsContext } from "./context/seatsContext";
import ticketService from "./services/ticketService";
import Mainpage from "./components/mainpage/mainpage";
import Cart from "./components/cart/cart";
import "./App.css";

function App() {
  const { secured, timer, setTimer } = useContext(SeatsContext);
  const isInitialMount = useRef(true);

  useEffect(() => {
    return () => {
      console.log("ON CLOSE PAGE BASICALLY");
      //unsecure tickets if were not purchased
      if (secured && secured.length > 0) {
        const allSeats = secured.map(seat => {
          return seat.seat;
        });
        let userId = sessionStorage.getItem("userId");
        let seat = { ticket: [].concat(allSeats), userId: userId };
        ticketService.unSecure(seat).then(data => {
          console.log(data);
          //if (!data.error) {
            //setSecured(null);
            //setChosen([]);
            //localStorage.setItem("tickets", JSON.stringify(null));
            //history.push("/");
          //}
        });
      }
      
      //has to clear [timer] and localstorage for "timer-count"
      //clear();
    };
  }, []);

  //not trigger interval on initial mount
  useEffect(() => {
    console.log(timer)
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      //sessionStorage.setItem("timer-count", JSON.stringify(timer));
      window.myInterval = setInterval(() => {
        setTimer(timer => timer - 1);
      }, 1000);
    }
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
