import React, { useState, useContext, useEffect } from "react";
//import Poster from "../poster/poster";
//import PreviewTickets from "../previewTickets/previewTickets";
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
        return seat.id != e.target.value;
      });
      console.log(filteredChosen);
      setChosen(filteredChosen);
      return;
    } else {
      console.log("CHECK");
      let seat = {
        row: e.target.dataset.row,
        seat: e.target.dataset.seat,
        price: e.target.dataset.price,
        type: e.target.dataset.type,
        id: e.target.value
      };
      setChosen(chosen.concat(seat));
    }
  };

  const showPopUp = (row, num) => {
    let allSeats = document.getElementsByClassName("popup");
    for (let i = 0; i < allSeats.length; i++) {
      allSeats[i].style.display = "none";
    }
    document.getElementById("popup-" + row + "" + num).style.display = "block";
  };

  const rows = seatsData.seatsRows.map((row, index) => {
    return <li key={index}>row {row}</li>;
  });

  const seatsLayout = seatsData.seatsRows.map((row, rowIndex) => {
    return seatsData.seatsNums.map((num, numIndex) => {
      let ticketType = rowIndex > 1 ? (rowIndex > 6 ? "Sale" : "Standard") : "VIP";
      return (
        <div className="check-parent">
          <input
            className="check-box"
            id={row + "" + num}
            key={row + "" + num}
            type="checkbox"
            name="seat"
            value={row + "" + num}
            data-price={rowIndex > 1 ? (rowIndex > 6 ? "150" : "250") : "500"}
            data-type={
              ticketType
            }
            data-row={row}
            data-seat={num}
            onChange={changeBox}
            onMouseEnter={(e, i) => showPopUp(row, num)}
          />
          <div id={"popup-" + row + "" + num} className="popup">
            Seat:{row + num}
            <br />
            {rowIndex > 1 ? (rowIndex > 6 ? "Sale" : "Standard") : "VIP"} Ticket
            <div className="arrow"></div>
          </div>
        </div>
      );
    });
  });

  return (
    <div id="seats-box">
      <div id="rows">
        <ul>{rows}</ul>
      </div>
      <div id="seats">{seatsLayout}</div>
      {/* <div id="show">
        <Poster /> */}
      {/*<PreviewTickets />
      </div>*/}
    </div>
  );
}

export default Seats;
