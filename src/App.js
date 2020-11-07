import React, { useState, useEffect, useContext, useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SeatsContext } from "./context/seatsContext";
import ticketService from "./services/ticketService";
import Mainpage from "./components/mainpage/mainpage";
import Cart from "./components/cart/cart";
import Checkout from "./components/checkout/checkout";
import PageNotFound from "./components/pageNotFound/pageNotFound";
import "./App.css";

function App() {
  const { secured, timer, setTimer } = useContext(SeatsContext);
  const isInitialMount = useRef(true);

  useEffect(() => {
    window.addEventListener("unload", function() {
      console.log("!!!!!!!!!!!!!!")
      let url = "/api/unsecure";
      let dt = JSON.Stringify({seat:"PPP"})
      navigator.sendBeacon(url, dt);
      //ticketService.unSecure({seat:"PPP"}).then(data => {});
      
    });
    //     window.addEventListener("unload", ()=>{
    //       //event.preventDefault();
    //     //var message =
    //     //  "Warning!\n\nNavigating away from this page will delete your text if you haven't already saved it.";
    //     //event.returnValue = message;
    //     //console.log(event)
    //     const allSeats = secured.map(seat => {
    //       return seat.id;
    //     });
    //     let userId = sessionStorage.getItem("userId");
    //     let seat = { ticket: [].concat(allSeats), userId: userId };
    //     ticketService.unSecure(seat).then(data => {});

    //     //return message;
    //     },false);
  }, []);

  //not trigger interval on initial mount
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    } else {
      sessionStorage.setItem("timer", JSON.stringify(timer));
      window.myInterval = setInterval(() => {
        setTimer(timer => timer - 1);
      }, 1000);
    }
    return () => {
      clearInterval(window.myInterval);
    };
  }, [timer]);

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Mainpage} />
        <Route path="/cart" exact component={Cart} />
        {/*  <Route path="*" exact component={PageNotFound} /> */}
        <Route path="/checkout" exact component={Checkout} />
        <Route path="*" exact component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;
