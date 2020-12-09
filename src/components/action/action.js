// import React, { useState, useContext } from "react";
// import { useHistory } from "react-router-dom";
// import ticketService from "../../services/ticketService";
// import { SeatsContext } from "../../context/seatsContext";
// import "./action.scss";

// function Action() {
//   const {
//     chosen,
//     setChosen,
//     secured,
//     setSecured,
//     show,
//     setShow,
//     timer,
//     setTimer,
//     total,
//     setTotal
//   } = useContext(SeatsContext);
//   let history = useHistory();

//   const cancel = () => {
//     if (!secured || secured.length < 1) {
//       return history.push("/");
//     }
//     const allSeats = secured.map(seat => {
//       return seat.id;
//     });
//     let userId = sessionStorage.getItem("userId");
//     let seat = { ticket: [].concat(allSeats), userId: userId };
//     ticketService.unSecure(seat).then(data => {
//       if (!data.error) {
//         setSecured(null);
//         setChosen([]);
//         sessionStorage.removeItem("timer");
//         sessionStorage.removeItem("tickets");
//         history.push("/");
//       }
//     });
//   };

//   const proceed = () => {
//     history.push("/checkout");
//   };

//   return (
//     <div id="action-btns">
//       <button onClick={cancel}>&#8592; Cancel</button>
//       <button onClick={proceed}>Purchase &#8594;</button>
//     </div>
//   );
// }

// export default Action;

import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import ticketService from "../../services/ticketService";
import { SeatsContext } from "../../context/seatsContext";
import "./action.scss";

function Action() {
  const {
    chosen,
    setChosen,
    secured,
    setSecured,
  } = useContext(SeatsContext);
  let history = useHistory();

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
        setSecured(null);
        setChosen([]);
        sessionStorage.removeItem("timer");
        sessionStorage.removeItem("tickets");
        history.push("/");
      }
    });
  };

  const proceed = () => {
    history.push("/checkout");
  };

  return (
    <div id="action-btns">
      <button onClick={cancel}>&#8592; Cancel</button>
      <button onClick={proceed}>Pay with card &#8594;</button>
    </div>
  );
}

export default Action;
