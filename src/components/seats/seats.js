import React, { useState, useContext, useEffect } from "react";
import { SeatsContext } from "../../context/seatsContext";
import seatsData from "../../data/seatsData";
import "./seats.scss";

function Seats() {
  const { chosen, setChosen } = useContext(SeatsContext);

  const changeBox = e => {
    if (e.target.checked == false) {
      let filteredChosen = chosen.filter(seat => {
        return seat.id != e.target.value;
      });
      setChosen(filteredChosen);
      return;
    } else {
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

  //show small box with info above hovered seat
  const showPopUp = (row, num) => {
    let allSeats = document.getElementsByClassName("popup");
    for (let i = 0; i < allSeats.length; i++) {
      allSeats[i].style.display = "none";
    }
    document.getElementById("popup-" + row + "" + num).style.display = "block";
  };
  
  const hidePopUp = () => {
    let allSeats = document.getElementsByClassName("popup");
    for (let i = 0; i < allSeats.length; i++) {
      allSeats[i].style.display = "none";
    }
  }

  const rows = seatsData.seatsRows.map((row, index) => {
    return <li key={index}>row {row}</li>;
  });

  const seatsLayout = seatsData.seatsRows.map((row, rowIndex) => {
    return seatsData.seatsNums.map((num, numIndex) => {
      let ticketType =
        rowIndex > 4 && (numIndex < 5 || numIndex > 14) ? "Corner" : "Standard";
      let ticketPrice = rowIndex > 4 && (numIndex < 5 || numIndex > 14) ? "150" : "250";
      return (
        <div className="check-parent" onMouseLeave={hidePopUp} key={numIndex}>
          <input
            className="check-box"
            id={row + "" + num}
            key={row + "" + num}
            type="checkbox"
            name="seat"
            value={row + "" + num}
            data-price={ticketPrice}
            data-type={ticketType}
            data-row={row}
            data-seat={num}
            onChange={changeBox}
            onMouseEnter={(e, i) => showPopUp(row, num)}
          />
          <div id={"popup-" + row + "" + num} className="popup">
            Seat:{row + num}
            <br />${ticketPrice}
            <br />
            {ticketType} Ticket
            <div className="arrow"></div>
          </div>
        </div>
      );
    });
  });

  return (
    <div id="seats-box">
      <h1>Pick seat(s)</h1>
      <div id="stage">
        <img src="https://cdn.glitch.com/c0586dd4-7651-4358-b23c-03375ad2c1c6%2FLine.svg?v=1607394941898" />
      </div>
      <div id="seats" >{seatsLayout}</div>
    </div>
  );
}

export default Seats;

