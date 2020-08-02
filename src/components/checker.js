import React, { useState, useContext } from 'react'
import ticketService from '../services/ticketService'
import { MessageContext } from '../context/messageContext'

function Checker(){
  
  const [message,setMessage] = useContext(MessageContext);
  
  const showOrCancelSeats=(evt)=>{
    evt.preventDefault();
    let id = document.getElementById('text-field').value
    let action = document.activeElement.name;
    let params = {id:id, action:action}
    ticketService.modify(params).then(data=>{
      setMessage(`${data.text} ${data.seat}`)
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