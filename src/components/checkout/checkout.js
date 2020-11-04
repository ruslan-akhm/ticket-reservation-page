import React, { useState, useContext, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import { SeatsContext } from "../../context/seatsContext";
import checkoutService from "../../services/checkoutService";
import "./checkout.scss";

//if payment success - clean chosen and secured  +  sessionStorage (all) => redirect to mainpage and give new userId
//if cancel - unsecure tickets, clean all states and stoarges -> redirect to "/"
//if timer ran out -> same as cancel ()  CHECK in TIMER.JS
//if closed page => unsecure tickets and clear all states and storages


function Checkout() {
  const { total, setTotal, secured, setSecured } = useContext(SeatsContext);

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

  return (
    <div>
      <StripeCheckout
        stripeKey="pk_test_51HggwPCG1w6N7hyjuemFJNqZrVfja0QxUWhsfH6S2h1i2WWYP6H78cBWPy6IlX34TiwMhPdg8AOy6zq06yMDMvKD00OBEsg0kT"
        token={handleToken}
        amount={total * 100}
      />
    </div>
  );
}

export default Checkout;
