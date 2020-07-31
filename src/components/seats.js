import React from 'react'
import ticketService from '../services/ticketService'


const seatsLayout = {
  A:["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"],
  B:["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"],
  C:["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"],
  D:["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"],
  E:["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"],
  F:["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"],
  G:["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"],
  H:["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"],
};

function Seats(){
  
  const reserveSeats=(e)=>{
   e.preventDefault();
    
   document.getElementById('modal').style.display="block"
    
   let allSeats = document.getElementsByClassName('check-box')
   let seatsChosen = [];
   for(let x=0;x<allSeats.length;x++){
     if(allSeats[x].checked==true)
       seatsChosen.push(allSeats[x].value)
   }
   let params = {seat:seatsChosen};//'+JSON.stringify(seatsChosen) // We have to stringify to send to server and there we Parse to properly read the seats
   console.log(params)
    //we stringify in ticketservice
   ticketService.reserve(params).then(data=>{
     console.log(data);
     document.getElementById('top-line').innerHTML = data.text
     document.getElementById('bottom-line').innerHTML = data.ticketId
   })
//     var newSave = new XMLHttpRequest();
//     newSave.open('POST', '/api/reserve', true);
//     newSave.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
   
//     newSave.onload = function(){
//       var res = JSON.parse(this.response)
//       document.getElementById('top-line').innerHTML = res.text
//       document.getElementById('bottom-line').innerHTML = res.ticketId
//     }
//     newSave.send(params);
  } 
  
  const keys = Object.keys(seatsLayout);
  const rows = keys.map(item=>{return <ul className="list" key={item}><li>row {item}</li></ul>})
  const seats = keys.map(row=>{return seatsLayout[row].map(seat=>{
      return <label for={seat} key={row+''+seat} className="seat-label"><input className="check-box" id={row+""+seat} key={row+""+seat} type="checkbox" name="seat" value={row+""+seat}/>{seat}</label>
    })});
  
  return(
    <div>
      <form id="form1" onSubmit={reserveSeats}>
        <div id="parent"> 
          <div id="seats-rows">{rows}</div>
          <div id="seats-parent">{seats}</div>
          <input className="reserve" id="reserve-button" type="submit" value="Reserve"></input>
        </div>
      </form>
    </div>
  )
}

export default Seats