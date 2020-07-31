import React from 'react'
import ticketService from '../services/ticketService'


function Checker(){
  
  const showOrCancelSeats=(evt)=>{
    evt.preventDefault();
    //console.log('showing ... ')
    document.getElementById('modal').style.display="block";
    
    let id = document.getElementById('text-field').value
    
    //let cancel='cancel';
    //let showId='show';
    //document.activeElement.name=='show'?cancel=null:showId=null; 
    
    let action = document.activeElement.name;
    //console.log(document.activeElement, document.getElementById('show-id').clicked, document.getElementById('cancel').clicked)
    console.log(id)
    //var pars='id='+id+'&cancel='+cancel+'&show='+showId;
    let params = {id:id, action:action}
    console.log(params)
    
    ticketService.modify(params).then(data=>{
      document.getElementById('top-line').innerHTML = data.text
      document.getElementById('bottom-line').innerHTML = data.seat
    })
    
    // var showSeats = new XMLHttpRequest();
    // showSeats.open('POST', '/api/id', true);
    // showSeats.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // showSeats.onload = function(){
    //   var resp = JSON.parse(this.response )//
    //   console.log(resp, typeof resp)
    //   document.getElementById('top-line').innerHTML = resp.text
    //   document.getElementById('bottom-line').innerHTML = resp.seat
    // }
    // showSeats.send(pars);
    
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