import React, { useState, useContext, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import { SeatsContext } from "../../context/seatsContext";
import checkoutService from "../../services/checkoutService";
import "./checkout.scss";

function Checkout() {
  const { total, setTotal, secured, setSecured } = useContext(SeatsContext);

  const handleToken = token => {
    
    const product = secured;
    
    checkoutService.makePayment({token, product}).then(data=>{
      console.log(data)
    })
  };

  return (
    <div>
      <StripeCheckout
        stripeKey={process.env.STRIPE_KEY}
        token={handleToken}
        amount={total * 100}
        name="TICKET_IDs"
      />
    </div>
  );
}

export default Checkout;
