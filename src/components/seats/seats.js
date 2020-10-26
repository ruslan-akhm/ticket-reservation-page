import React, { useState, useContext, useEffect } from "react";
import Poster from "../poster/poster";
import PreviewTickets from "../previewTickets/previewTickets";
//import ticketService from "../../services/ticketService";
import { SeatsContext } from "../../context/seatsContext";
import seatsData from "../../data/seatsData";
import "./seats.scss";

function Seats() {
  const { chosen, setChosen } = useContext(SeatsContext);

  // useEffect(() => {
  //   console.log(chosen);
  // }, [chosen]);

  const changeBox = e => {
    //console.log(e.target.checked)
    if (e.target.checked == false) {
      console.log("UNCHECK");
      let filteredChosen = chosen.filter(seat => {
        return seat.seat != e.target.value;
      });
      setChosen(filteredChosen);
      return;
    } else {
      console.log("CHECK");
      let seat = {
        seat: e.target.value,
        price: e.target.dataset.price
      };
      setChosen(chosen.concat(seat));
    }
  };

 

  const rows = seatsData.seatsRows.map((row,index) => {
    return <li key={index}>row {row}</li>;
  });

  const seatsLayout = seatsData.seatsRows.map((row, rowIndex) => {
    return seatsData.seatsNums.map((num, numIndex) => {
      return (
          <input
            className="check-box"
            id={row + "" + num}
            key={row + "" + num}
            type="checkbox"
            name="seat"
            value={row + "" + num}
            data-price={rowIndex > 1 ? (rowIndex > 6 ? "150" : "250") : "500"}
            onChange={changeBox}
            
          />
      );
    });
  });

  return (
    <div id="seats-box">
      <div id="rows">
        <ul>{rows}</ul>
      </div>
      <div id="seats">{seatsLayout}</div>
      <div id="show">
        <Poster />
        <PreviewTickets />
      </div>
    </div>
  );
}

export default Seats;
