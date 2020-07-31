import React from 'react';
import ticketService from './services/ticketService'
import Seats from './components/seats'
import Checker from './components/checker'
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
    
    }
    this.updateSeats=this.updateSeats.bind(this);
    this.closeModal=this.closeModal.bind(this);
    //this.saveChosenSeats=this.saveChosenSeats.bind(this);
    //this.showOrCancelSeats=this.showOrCancelSeats.bind(this)
  }
  
  componentDidMount(){
    this.updateSeats();
  }
  
  updateSeats(){
    let seats = document.getElementsByClassName('check-box');
    for(let m=0; m<seats.length; m++){
      seats[m].checked=false;
      seats[m].disabled=false;
    }
    ticketService.update().then(data=>{
      let taken = data.seats;
      for(let j=0;j<seats.length;j++){
        taken.map(t=>{
          return t==seats[j].value?seats[j].disabled=true:null;
        })
      }
    })
    document.getElementById('top-line').innerHTML = ' '
    document.getElementById('bottom-line').innerHTML = ' '
  }
  
  // showOrCancelSeats(evt){
  //   evt.preventDefault();
  //   console.log('showing ... ')
  //   document.getElementById('modal').style.display="block";
  //   var id = document.getElementById('text-field').value
  //   var cancel='cancel';
  //   var showId='show';
  //   document.activeElement.name=='show'?cancel=null:showId=null; 
  //   //console.log(document.activeElement, document.getElementById('show-id').clicked, document.getElementById('cancel').clicked)
  //   console.log(id)
  //   var pars='id='+id+'&cancel='+cancel+'&show='+showId;
  //   console.log(pars)
  //   var showSeats = new XMLHttpRequest();
  //   showSeats.open('POST', '/api/id', true);
  //   showSeats.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  //   showSeats.onload = function(){
  //     var resp = JSON.parse(this.response )//
  //     console.log(resp, typeof resp)
  //     document.getElementById('top-line').innerHTML = resp.text
  //     document.getElementById('bottom-line').innerHTML = resp.seat
  //   }
  //   showSeats.send(pars);
  // }
  
  closeModal(event){
    const modal = document.getElementById('modal');
    const close = document.getElementById('close-modal');
    if (event.target == modal||event.target == close) {
      modal.style.display="none"
      this.updateSeats();
  }
  }
  
  render(){
    //const takenSeats = this.state.taken;
    
    // const keys = Object.keys(seatsLayout);
    // const rows = keys.map(key=>{return <ul className="list" key={key}><li>row {key}</li></ul>})
    // this.seats = keys.map(row=>{return seatsLayout[row].map(seat=>{
    //   return <label for={seat} key={row+''+seat} className="seat-label"><input className="check-box" id={row+""+seat} key={row+""+seat} type="checkbox" name="seat" value={row+""+seat}/>{seat}</label>
    // })});
    
    return(
      <div id="page">
        <div id="stage">STAGE/SCREEN</div>
        <Seats />
        <Checker />
        {/* <!--         <div id="have-id">Already made reservation? To check your seats enter your ticket ID
          <form id="form2" onSubmit={this.showOrCancelSeats}>
            <input id="text-field" type="text" name="id" placeholder="enter your ticket ID" required></input>
            <input id="show-id" type="submit" name="show" value="Show"></input>
            <br/>...or<input id="cancel" type="submit" name="cancel" value="cancel"></input>reservation
          </form>
        </div> --> */}
        <div id='modal' onClick={this.closeModal}>
          <div id="modal-content">
            <div id='top-line'></div>
            <div id='bottom-line'></div>
            <button id='close-modal'>CLOSE</button>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
