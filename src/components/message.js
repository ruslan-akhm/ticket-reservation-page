// import React, { useState, useContext, useEffect } from 'react'
// import ticketService from '../services/ticketService'
// import { MessageContext } from '../context/messageContext'

// function Message(){
  
//   const [message,setMessage] = useContext(MessageContext);
  
//   useEffect(()=>{
//     document.getElementById('message').style.display="block"
//   },[message])
  
//   useEffect(()=>{
//     document.getElementById('message').style.display="none"
//   },[])
  

  
//   return(
//     <div id="message">
//       <div id="message-content">
//          <h3>{message}</h3>
//       </div>
//     </div>
//   )
// }

// export default Message