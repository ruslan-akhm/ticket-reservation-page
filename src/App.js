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

//   useEffect(() => {

//   }, []);

  //not trigger interval on initial mount
  useEffect(() => {
    console.log(timer)
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return
    } else {
      //sessionStorage.setItem("timer-count", JSON.stringify(timer));
      window.myInterval = setInterval(() => {
        setTimer(timer => timer - 1);
      }, 1000);
    }
    return()=>{clearInterval(window.myInterval)}
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
