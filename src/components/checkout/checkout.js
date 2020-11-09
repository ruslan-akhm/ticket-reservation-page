import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Spinner from "../loading/spinner";
import { SeatsContext } from "../../context/seatsContext";
//import ticketService from "../../services/ticketService";
import checkoutService from "../../services/checkoutService";
import stripeStyling from "./stripeStyling"
import "./checkout.scss"
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import "./checkout.scss";
const stripePromise = loadStripe(
  "pk_test_51HggwPCG1w6N7hyjuemFJNqZrVfja0QxUWhsfH6S2h1i2WWYP6H78cBWPy6IlX34TiwMhPdg8AOy6zq06yMDMvKD00OBEsg0kT"
);

function Form() {
  const stripe = useStripe();
  const elements = useElements();
  const {
    total,
    setTotal,
    secured,
    setSecured,
    chosen,
    setChosen,
    timer,
    setTimer
  } = useContext(SeatsContext);
  let history = useHistory();
  const [customer, setCustomer] = useState({ email: "", name: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setTimer(200);
  }, []);

  const cancel = () => {
    clear();
    history.push("/");
  };

  const home = () => {
    history.push("/");
  };

  const clear = () => {
    setSecured(null);
    setChosen([]);
    window.clearInterval(window.myInterval);
    setTimer(null);
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("timer");
    sessionStorage.removeItem("tickets");
  };

  const inputChange = e => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async event => {
    //set loading, hide pay btn, hide cancel btn
    //success -> remove loading, show message, show "home" btn
    //failure -> remove loaading, show message
    event.preventDefault();
    setIsLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });
    if (!error) {
      const { id } = paymentMethod;
      const product = secured;
      checkoutService
        .makePayment({
          id,
          product,
          price: total * 100,
          user: customer
        })
        .then(data => {
          setIsLoading(false);
          setMessage(data.message);
          console.log(timer);
          console.log(data);
          if (!data.error) {
            setIsPaid(true);
            clear();
          } else {
            console.log(secured);
          }
        });
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "400px", margin: "0 auto" }}
      >
        <input
          onChange={inputChange}
          type="email"
          name="email"
          placeholder="Send tickets to..."
          required
        />
        <input
          onChange={inputChange}
          type="text"
          name="name"
          placeholder="Cardholder name"
          required
        />
        <CardElement options={stripeStyling}/>
        {isLoading || isPaid ? null : (
          <button type="submit" disabled={!stripe}>
            Pay ${total}
          </button>
        )}
      </form>
      {isLoading ? (
        <Spinner />
      ) : (
        <button onClick={isPaid ? home : cancel}>
          {isPaid ? "Homepage" : "Cancel"}
        </button>
      )}
      {message ? <p>{message}</p> : null}
    </div>
  );
}

function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <Form />
    </Elements>
  );
}

export default Checkout;
