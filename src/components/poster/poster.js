// import React, { useState, useContext } from "react";
// import ticketService from "../../services/ticketService";
// import { SeatsContext } from "../../context/seatsContext";
// import "./poster.scss";

// function Poster() {
//   const { show, setShow } = useContext(SeatsContext);

//   return (
//     <div className="show-box">
//       <div className="show-image">
//         <img src="https://cdn.glitch.com/3eeb3b2b-1bb2-49a0-811f-d94dbc022a91%2FCircus-logo.jpg?v=1603851496387" />
//       </div>
//       <div className="show-description">
//         <h5>{show.performer}</h5>
//         <div className="show-details">
//           <p>&nbsp;{show.date}</p>
//           <p>&nbsp;{show.time}</p>
//           <p>&nbsp;{show.stage}</p>
//           <p>&nbsp;{show.location}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Poster;

import React, { useState, useContext } from "react";
import ticketService from "../../services/ticketService";
import { SeatsContext } from "../../context/seatsContext";
import "./poster.scss";

function Poster() {
  const { show, setShow } = useContext(SeatsContext);

  return (
    <div id="poster">
      <h3>{show.performer}</h3>
    <ul className="show-box">
      <li>&nbsp;{show.date}</li>
      <li>&nbsp;{show.time}</li>
      <li>&nbsp;{show.stage}</li>
      <li>&nbsp;{show.location}</li>
    </ul>
      </div>
  );
}

export default Poster;

