// import React, { useState, useContext, useEffect } from "react";
// import { useHistory } from "react-router-dom";
// import StripeCheckout from "react-stripe-checkout";
// import { SeatsContext } from "../../context/seatsContext";
// import ticketService from "../../services/ticketService";
// import checkoutService from "../../services/checkoutService";
// import "./checkout.scss";

// //if payment success - clean chosen and secured  +  sessionStorage (all) => redirect to mainpage and give new userId
// //if cancel - unsecure tickets, clean all states and stoarges -> redirect to "/"
// //if timer ran out -> same as cancel ()  CHECK in TIMER.JS
// //if closed page => unsecure tickets and clear all states and storages

// function Checkout() {
//   const {
//     total,
//     setTotal,
//     secured,
//     setSecured,
//     chosen,
//     setChosen
//   } = useContext(SeatsContext);
//   let history = useHistory();

//   useEffect(() => {
//     console.log(secured);
//   }, []);

//   const handleToken = token => {
//     //show loading
//     const product = secured;
//     console.log(secured);
//     checkoutService
//       .makePayment({
//         token,
//         product,
//         price: total,
//         user: sessionStorage.getItem("userId")
//       })
//       .then(data => {
//         if (!data.error) {
//           //stop loading
//           //show check mark
//           //clear all
//           clear();
//           // setSecured(null);
//           // setChosen([]);
//           // sessionStorage.removeItem("timer");
//           // sessionStorage.removeItem("tickets"); //, JSON.stringify(null));
//           // history.push("/");
//         }
//       });
//   };

//   const cancel = () => {
//     const allSeats = secured.map(seat => {
//       return seat.id;
//     });
//     let userId = sessionStorage.getItem("userId");
//     let seat = { ticket: [].concat(allSeats), userId: userId };
//     ticketService.unSecure(seat).then(data => {
//       console.log(data);
//       if (!data.error) {
//         clear();
//         // setSecured(null);
//         // setChosen([]);
//         // sessionStorage.removeItem("timer");
//         // sessionStorage.removeItem("tickets"); //, JSON.stringify(null));
//         // history.push("/");
//       }
//     });
//   };

//   const clear = () => {
//     setSecured(null);
//     setChosen([]);
//     sessionStorage.removeItem("userId");
//     sessionStorage.removeItem("timer");
//     sessionStorage.removeItem("tickets"); //, JSON.stringify(null));
//     //history.push("/");
//   };

//   return (
//     <div>
//       {/* <StripeCheckout
//         stripeKey="pk_test_51HggwPCG1w6N7hyjuemFJNqZrVfja0QxUWhsfH6S2h1i2WWYP6H78cBWPy6IlX34TiwMhPdg8AOy6zq06yMDMvKD00OBEsg0kT"
//         token={handleToken}
//         amount={total * 100}
//       /> */}

//       <button onClick={cancel}>Cancel</button>
//     </div>
//   );
// }

// export default Checkout;

import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
//import StripeCheckout from "react-stripe-checkout";
import { SeatsContext } from "../../context/seatsContext";
import ticketService from "../../services/ticketService";
import checkoutService from "../../services/checkoutService";
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
    setChosen
  } = useContext(SeatsContext);
  let history = useHistory();
  const [customer, setCustomer] = useState({ email: "", name: "" });
  //   const handleToken = token => {
  //   //show loading
  //   const product = secured;
  //   console.log(secured);
  //   checkoutService
  //     .makePayment({
  //       token,
  //       product,
  //       price: total,
  //       user: sessionStorage.getItem("userId")
  //     })
  //     .then(data => {
  //       if (!data.error) {
  //         //stop loading
  //         //show check mark
  //         //clear all
  //         clear();
  //         // setSecured(null);
  //         // setChosen([]);
  //         // sessionStorage.removeItem("timer");
  //         // sessionStorage.removeItem("tickets"); //, JSON.stringify(null));
  //         // history.push("/");
  //       }
  //     });
  // };
  const clear = () => {
    setSecured(null);
    setChosen([]);
    setTimer(null);
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("timer");
    sessionStorage.removeItem("tickets"); //, JSON.stringify(null));
    //history.push("/");
  };

  const inputChange = e => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async event => {
    //set loading, hide pay btn, hide cancel btn
    //success -> remove loading, show message, show "home" btn
    //failure -> remove loaading, show message
    event.preventDefault();
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
          if(!data.error){
            clear();
          }
        });
    }
  };

  return (
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
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay ${total}
      </button>
    </form>
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
