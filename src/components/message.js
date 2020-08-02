import React, { useState, useContext, useEffect } from 'react'
import ticketService from '../services/ticketService'
import { MessageContext } from '../context/messageContext'
//import '../App.css';


function Message(){
  
  const [message,setMessage] = useContext(MessageContext);
  
  useEffect(()=>{
    document.getElementById('message').style.display="block"
  },[message])
  
  useEffect(()=>{
    document.getElementById('message').style.display="none"
  },[])
  
  const closeModal=(event)=>{
    const modal = document.getElementById('modal');
    const close = document.getElementById('close-modal');
    if (event.target == modal||event.target == close) {
      modal.style.display="none"
      this.updateSeats();
  }
  }
  
//   {/*<div id='modal' onClick={closeModal}>
//       <div id="modal-content">
//         <div id='top-line'></div>
//         <div id='bottom-line'></div>
//         <button id='close-modal'>CLOSE</button>
//       </div>
//     </div> */}
  
    
  return(
    
    <div id="message">
      <div id="message-content">
         <h3>{message}</h3>
      </div>
    </div>
  )
}

export default Message