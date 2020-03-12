import React from 'react';
import './App.css';

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
class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      //taken:[]
    }
    this.updateSeats=this.updateSeats.bind(this);
   // this.saveChosenSeats=this.saveChosenSeats.bind(this);
  }
  //Make initial request to GET all the taken seats and disable them for reservation
  componentDidMount(){
    window.addEventListener('pageshow',this.updateSeats)
    document.getElementById('form1').addEventListener('submit',this.saveChosenSeats)
  }
  
  updateSeats(){
    console.log("Triggering seats update")//If returning from response page via browser 'back' button - re-render seats to reflect ones just reserved
    var xmlhttp = new XMLHttpRequest(),
    method = 'GET',
    url = '/api/';
    var disableTaken = document.getElementsByClassName('check-box'); //make all checkboxes unchecked to load and see if they are disabled
    for(let m=0;m<disableTaken.length;m++){
      disableTaken[m].checked=false;
    }
    setTimeout(function(){
      xmlhttp.open(method, url, true);
      xmlhttp.onload = function () {
      var response = xmlhttp.response //Here we receive String of seat IDs
      var taken = JSON.parse(response) //And parse it to make it an Array
      for(let j=0;j<disableTaken.length;j++){
      taken.map(t=>{
        return t==disableTaken[j].value?disableTaken[j].disabled=true:null;
      })
      }
    };
    xmlhttp.send();},150) //TiemeOut to let browser get response from database and then re-render seats 
  }
  
 saveChosenSeats(e){
   e.preventDefault();
   var allSeats = document.getElementsByClassName('check-box')
   var seatP = [];
   for(let x=0;x<allSeats.length;x++){
     if(allSeats[x].checked==true){
     seatP.push(allSeats[x].value)
     }
   }
   console.log(seatP, seatP.length, typeof seatP)
   var params = 'seat='+JSON.stringify(seatP) // We have to stringify to send to server and there we Parse to properly read the seats
   console.log(params)
    var newSave = new XMLHttpRequest();
    newSave.open('POST', '/api/reserve', true);
   newSave.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
   
    newSave.onload = function(){
      //var res = JSON.parse(this.responseText)
      console.log(typeothis.responseText)
      //console.log(res)
      document.getElementById('modal').innerHTML = this.responseText
    }
    newSave.send(params);
    
  } 
  
  render(){
    const takenSeats = this.state.taken;
    const keys = Object.keys(seatsLayout);
    const rows = keys.map(key=>{return <ul className="list" key={key}><li>row {key}</li></ul>})
    this.seats = keys.map(row=>{return seatsLayout[row].map(seat=>{
      return <label for={seat} key={row+''+seat} className="seat-label"><input className="check-box" id={row+""+seat} key={row+""+seat} type="checkbox" name="seat" value={row+""+seat}/>{seat}</label>
    })});
    
    return(
      <div id="page">
        <div id="stage">STAGE/SCREEN</div>
        <div>
        <form id="form1" > {/* action="/api/reserve" method="POST"  */}
          <div id="parent"> 
            <div id="seats-rows">{rows}</div>
            <div id="seats-parent">{this.seats}</div>
            <input className="reserve" id="reserve-button" type="submit" value="Reserve"></input>
          </div>
        </form>
        </div>
        <div id="have-id">Already made reservation? To check your seats enter your ticket ID
          <form action="api/id" method="POST">
            <input className="text-field" type="text" name="id" required></input>
            <input className="show-id" type="submit" name="show" value="Show"></input>
            <br/>...or cancel reservation<input className="cancel" type="submit" name="cancel" value="Cancel"></input>
          </form>
        </div>
        <div id='modal'>
        </div>
      </div>
    )
  }
}

export default App;
