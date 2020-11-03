import React, { useState, useContext, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import { SeatsContext } from "../../context/seatsContext";
import checkoutService from "../../services/checkoutService";
import "./checkout.scss";

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
