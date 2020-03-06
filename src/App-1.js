import React from 'react';
import './App.css';


class App1 extends React.Component{
  constructor(props){
    super(props);
    this.state={
      taken:[]
    }
    
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  //Make initial request to GET all the taken seats and disable them for reservation
  componentDidMount(){
    var xmlhttp = new XMLHttpRequest(),
    method = 'GET',
    url = '/api/return';
    xmlhttp.open(method, url, true);
    xmlhttp.onload = function () {
      var response = xmlhttp.response //Here we receive String of seat IDs
      var message = JSON.parse(response)
      var disableTaken = document.getElementsByClassName('111'); //And parse it to make it an Array
    //  var disableTaken = document.getElementsByClassName('check-box'); 
   //   for(let j=0;j<disableTaken.length;j++){
//taken.map(t=>{
   //     return t==disableTaken[j].value?disableTaken[j].disabled=true:null;
    //  })
  //    }
    };
    xmlhttp.send();
  }
  
  handleSubmit(seats){
    //event.preventDefault();
    console.log(seats);
  }
  
  
  render(){
    
    
    return(
      <div id="page">
        <h1>{message}</h1>
      </div>
    )
  }
}

//ReactDOM.render(<App />,document.getElementById("root"))
export default App1;
