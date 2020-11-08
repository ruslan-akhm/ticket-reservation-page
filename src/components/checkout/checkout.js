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
//     history.push("/");
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
  CardElement,
  Elements,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import "./checkout.scss";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }
};

function Checkout() {
  const {
    total,
    setTotal,
    secured,
    setSecured,
    chosen,
    setChosen
  } = useContext(SeatsContext);
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  let history = useHistory();

  const handleToken = token => {
    //show loading
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
        if (!data.error) {
          //stop loading
          //show check mark
          //clear all
          //clear();
          // setSecured(null);
          // setChosen([]);
          // sessionStorage.removeItem("timer");
          // sessionStorage.removeItem("tickets"); //, JSON.stringify(null));
          // history.push("/");
        }
      });
  };
  //onSubmit={handleSubmit}
  //onChange={handleChange}

  return (
    <form >
      <div className="form-row">
        <label for="card-element">Credit or debit card</label>
        <CardElement
          id="card-element"
          options={CARD_ELEMENT_OPTIONS}
          
        />
        <div className="card-errors" role="alert">
          {error}
        </div>
      </div>
      <button type="submit">Submit Payment</button>
    </form>
  );
}

export default Checkout;
