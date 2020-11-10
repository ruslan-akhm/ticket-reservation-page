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
    if (timer && timer <= 1) {
      window.clearInterval(window.myInterval);
    }
    return () => {
      window.clearInterval(window.myInterval);
    };
  }, [timer]);

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Mainpage} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/checkout" exact component={Checkout} />
        <Route path="*" exact component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;
