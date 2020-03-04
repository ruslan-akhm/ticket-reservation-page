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
    this.state={}
    
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  
  handleSubmit(seats){
    console.log(seats);
  }
  
  
  render(){
   
    //const seats = seatsArray.map(seat=><label for={seat} className="seat-label"><input className="check-box" type="checkbox" id={seat}/>{seat}</label>);
    const keys = Object.keys(seatsLayout);
    const seats = keys.map(row=>{
      return seatsLayout[row].map(seat=>{
      //let tester = seat;
      //console.log("TESTER IS "+tester);
      return <label for={seat} className="seat-label"><input className="check-box" id="iddd" type="checkbox" name="seat" value={row+""+seat}/>{seat}</label>
    })});
  
    
    return(
      <div id="page">
        <form action="/api/reserve" method="POST" onSubmit={(seats)=>this.handleSubmit(seats)}>
          <div id="seats-parent">{seats}</div>
          <input type="submit" value="Reserve"></input>
        </form>
      </div>
    )
  }
}

//ReactDOM.render(<App />,document.getElementById("root"))
export default App;
