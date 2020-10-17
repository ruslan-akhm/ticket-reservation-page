import React, { useState, useContext, useEffect } from "react";
import Poster from "../poster/poster";
import ticketService from "../../services/ticketService";
import { SeatsContext } from "../../context/seatsContext";
import seatsData from "../../data/seatsData";
import "./seats.scss";

// const seatsLayout = {
//   A:["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"],
//   B:["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"],
//   C:["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"],
//   D:["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"],
//   E:["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"],
//   F:["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"],
//   G:["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"],
//   H:["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"],
// };

// function Seats(){

//   const [message,setMessage] = useContext(MessageContext);

//   const reserveSeats=(e)=>{
//      e.preventDefault();
//      let allSeats = document.getElementsByClassName('check-box')
//      let chosenSeats = [];
//      for(let x=0;x<allSeats.length;x++){
//        if(allSeats[x].checked==true)
//          chosenSeats.push(allSeats[x].value)
//      }
//      if(chosenSeats.length==0||!chosenSeats){
//        setMessage("Please, choose seats to reserve")
//         return
//      }
//      let seats = {seat:chosenSeats};
//      ticketService.reserve(seats).then(data=>{
//        console.log(data);
//        setMessage(`${data.text} ${data.ticketId}`)
//      })
//   }

//   const keys = Object.keys(seatsLayout);
//   const rows = keys.map(item=>{return <ul className="list" key={item}><li>row {item}</li></ul>})
//   const seats = keys.map(row=>{return seatsLayout[row].map(seat=>{
//       return <label for={seat} key={row+''+seat} className="seat-label"><input className="check-box" id={row+""+seat} key={row+""+seat} type="checkbox" name="seat" value={row+""+seat}/>{seat}</label>
//     })});

//   return(
//     <div className="seats-box">
//       <form id="form1" onSubmit={reserveSeats}>
//         <div id="parent">
//           <div id="seats-rows">{rows}</div>
//           <div id="seats-parent">{seats}</div>
//           <input className="reserve" id="reserve-button" type="submit" value="Reserve"></input>
//         </div>
//       </form>
//     </div>
//   )
// }

// const seatsNums = [
//   "1",
//   "2",
//   "3",
//   "4",
//   "5",
//   "6",
//   "7",
//   "8",
//   "9",
//   "10",
//   "11",
//   "12",
//   "13",
//   "14",
//   "15",
//   "16",
//   "17",
//   "18",
//   "19",
//   "20"
// ];
// const seatsRows = ["A", "B", "C", "D", "E", "F", "G", "H"];

function Seats() {
  const [chosen, setChosen] = useContext(SeatsContext);

  useEffect(() => {
    const allSeats = document.getElementsByClassName("check-box");
    let chosenSeats = JSON.parse(localStorage.getItem("chosenSeats")) || [];
    if(chosenSeats.length>0){
    for(let x = 0; x < allSeats.length; x++){
      chosenSeats.map(chosenSeat=>{
        if(allSeats[x].id==chosenSeat.seat){
          //WHICH COMPONENT IT DEPENDS ON?????????????
          //CHECKBOXED FLASH WHEN CLICKED 
          setTimeout(()=>{
          document.getElementById(chosenSeat.seat).checked=true;
           console.log("FLASH")
         },10)
        }
      })
    }
      //setChosen(chosenSeats);
    }
  }, [chosen]);
  
 useEffect(()=>{
   setChosen(JSON.parse(localStorage.getItem("chosenSeats")) || [])
 },[])

 

  function showChosenSeats(){
    const allSeats = document.getElementsByClassName("check-box");
    let chosenSeats = [];
    for (let x = 0; x < allSeats.length; x++) {
      if (allSeats[x].checked == true)
        chosenSeats.push({
          seat: allSeats[x].value,
          price: allSeats[x].dataset.price
        });
    }
    return chosenSeats;
  }
  
  const changeBox = () =>{
    let chosenSeats = showChosenSeats();
    localStorage.setItem("chosenSeats", JSON.stringify(chosenSeats && chosenSeats));
    setChosen(chosenSeats && chosenSeats);
  }
  
  // const toCart = e => {
  //   let chosenSeats = showChosenSeats();
  //   setChosen(chosenSeats && chosenSeats);
  // };

  const rows = seatsData.seatsRows.map(row => {
    return <li>row {row}</li>;
  });

  const seatsLayout = seatsData.seatsRows.map((row, rowIndex) => {
    return seatsData.seatsNums.map((num, numIndex) => {
      return (
        <label for={row + "" + num} key={row + "" + num} className="seat-label">
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
          {num}
        </label>
      );
    });
  });

  return (
    <div>
      <div id="seats-box">
        <div id="rows">
          <ul>{rows}</ul>
        </div>
        <div id="seats">{seatsLayout}</div>
        <div id="show">
          <Poster />
        </div>
      </div>
      {/*<button onClick={toCart}>Add to cart</button>*/}
    </div>
  );
}

export default Seats;
