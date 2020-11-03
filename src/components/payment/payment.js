import React, { useState, useContext, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import { SeatsContext } from "../../context/seatsContext";
import "./payment.scss";

function Payment() {
  const { total, setTotal } = useContext(SeatsContext);
  
  console.log(typeof total)
  
  const handleToken = (token) => {
    
  }
  
  return (
    <div>
      <StripeCheckout stripeKey={process.env.STRIPE_KEY} token={handleToken} amount={total}/>
    </div>
  );
}

export default Payment;
