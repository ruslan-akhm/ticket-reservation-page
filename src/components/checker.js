import React from 'react'
import ticketService from '../services/ticketService'

function Checker(){
  
  const showOrCancelSeats=(evt)=>{
    evt.preventDefault();
    
    //document.getElementById('modal').style.display="block";
    
    let id = document.getElementById('text-field').value
    let action = document.activeElement.name;
    let params = {id:id, action:action}
    ticketService.modify(params).then(data=>{
      document.getElementById('top-line').innerHTML = data.text
      document.getElementById('bottom-line').innerHTML = data.seat
    })
  }
  
  return(
    <div id="have-id">Already made reservation? To check your seats enter your ticket ID
      <form id="form2" onSubmit={showOrCancelSeats}>
        <input id="text-field" type="text" name="id" placeholder="enter your ticket ID" required></input>
        <input id="show-id" type="submit" name="show" value="Show"></input>
        <br/>...or<input id="cancel" type="submit" name="cancel" value="cancel"></input>reservation
      </form>
    </div>
  )
}

export default Checker