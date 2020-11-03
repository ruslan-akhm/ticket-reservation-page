import React, { useState, useContext, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import { SeatsContext } from "../../context/seatsContext";
import "./checkout.scss";

function Checkout() {
  const { total, setTotal } = useContext(SeatsContext);
  
  const handleToken = (token) => {
    
  }
  
  return (
    <div>
      <StripeCheckout stripeKey={process.env.STRIPE_KEY} token={handleToken} amount={total * 100} name="TICKET_IDs"/>
    </div>
  );
}

export default Checkout;
