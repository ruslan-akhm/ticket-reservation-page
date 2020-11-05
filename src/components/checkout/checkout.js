import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { SeatsContext } from "../../context/seatsContext";
import ticketService from "../../services/ticketService";
import checkoutService from "../../services/checkoutService";
import "./checkout.scss";

//if payment success - clean chosen and secured  +  sessionStorage (all) => redirect to mainpage and give new userId
//if cancel - unsecure tickets, clean all states and stoarges -> redirect to "/"
//if timer ran out -> same as cancel ()  CHECK in TIMER.JS
//if closed page => unsecure tickets and clear all states and storages


function Checkout() {
  const { total, setTotal, secured, setSecured, chosen, setChosen } = useContext(SeatsContext);
  let history = useHistory();

  useEffect(() => {
    console.log(secured);
  }, []);

  const handleToken = token => {
    const product = secured;
    console.log(secured);
    checkoutService
      .makePayment({
        token,
        product,
        price: total,
        user: sessionStorage.getItem("userId")
      })
      .then(data => {
        console.log(data);
      });
  };
  
  const cancel = () => {
    const allSeats = secured.map(seat => {
      return seat.id;
    });
    let userId = sessionStorage.getItem("userId")
    let seat = { ticket: [].concat(allSeats), userId: userId };
    ticketService.unSecure(seat).then(data => {
      console.log(data);
      if (!data.error) {
        setSecured(null);
        setChosen([]);
        sessionStorage.removeItem("timer")
        sessionStorage.removeItem("tickets")//, JSON.stringify(null));
        history.push("/");
      }
    });
  }

  return (
    <div>
      <StripeCheckout
        stripeKey="pk_test_51HggwPCG1w6N7hyjuemFJNqZrVfja0QxUWhsfH6S2h1i2WWYP6H78cBWPy6IlX34TiwMhPdg8AOy6zq06yMDMvKD00OBEsg0kT"
        token={handleToken}
        amount={total * 100}
      />
      <button onClick={cancel}>Cancel</button>
    </div>
  );
}

export default Checkout;
