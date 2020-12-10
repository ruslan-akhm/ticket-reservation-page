import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Timer from "../timer/timer";
import Spinner from "../loading/spinner";
import { SeatsContext } from "../../context/seatsContext";
import ticketService from "../../services/ticketService";
import checkoutService from "../../services/checkoutService";
import stripeStyling from "./stripeStyling";
import "./checkout.scss";
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
    setTimer(JSON.parse(sessionStorage.getItem("timer")));
    if (!secured || secured.length < 1) {
      setSecured(JSON.parse(sessionStorage.getItem("tickets")));
    }
  }, []);

  useEffect(() => {
    if ((!total || total == 0) && secured) {
      let cost = secured.map(ticket => parseInt(ticket.price)).reduce((acc,val)=>{return acc+val},0);
      setTotal(parseInt(cost));
    }
  }, [secured]);

  const cancel = () => {
    
    if (!secured || secured.length < 1) {
      return history.push("/");
    }
    const allSeats = secured.map(seat => {
      return seat.id;
    });
    let userId = sessionStorage.getItem("userId");
    let seat = { ticket: [].concat(allSeats), userId: userId };
    ticketService.unSecure(seat).then(data => {
      if (!data.error) {
        clear();
      }
    });
    
    
    //history.push("/");
  };

  const home = () => {
    clear();
    //history.push("/");
  };
 
  const clear = () => {
    setSecured(null);
    setChosen([]);
    window.clearInterval(window.myInterval);
    setTimer(null);
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("timer");
    sessionStorage.removeItem("tickets");
    history.push("/");
  };

  const inputChange = e => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  //submit data to back end
  const handleSubmit = async event => {
    event.preventDefault();
    if (!secured || secured.length < 1) {
      setMessage("No tickets to purchase");
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });
    if (!error) {
      setIsLoading(true);
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
          if (!data.error) {
            setIsPaid(true);
            
            //setTimer(600);
            window.clearInterval(window.myInterval);
            //clear();
          } else {
            console.log(secured);
          }
        });
    } else {
      setMessage(error.message);
    }
  };

  return (
    <div id="checkout-box">
      <div className="checkout-timer">
        <Timer />
      </div>
      <div id="payment-box">
        <form onSubmit={handleSubmit}>
          <label for="email">Email</label>
          <input
            onChange={inputChange}
            id="email"
            name="email"
            type="email"
            placeholder="Email..."
            required
          />
          <label for="name">Name</label>
          <input
            onChange={inputChange}
            id="name"
            name="name"
            type="text"
            placeholder="Name..."
            required
          />
          <label>Card details</label>
          <CardElement options={stripeStyling} />
          {isLoading || isPaid ? null : (
            <button type="submit" disabled={!stripe}>
              Pay ${total}
            </button>
          )}
        </form>
        {isLoading ? (
          <Spinner caller="checkout" />
        ) : (
          <button onClick={isPaid ? home : cancel}>
            {isPaid ? "Homepage" : "Cancel"}
          </button>
        )}
        {message ? <p>{message}</p> : null}
      </div>
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

