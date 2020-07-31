const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const shortid = require('shortid');
const Seat = require("./models/Seat");
var dataMongo = "mongodb+srv://ruslan-akhm:zuaGc0VJ@cluster0-y5h11.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(dataMongo, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
var db = mongoose.connection;

const app = express();
var showId;

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"));
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/index.html");
});

//Render seats page according to database
app.get('/api',(req,res)=>{
  //console.log("RECEIVED REQ");
  var seatsArray = []
  Seat.find({isTaken:true},(err,data)=>{
    if(err) return console.log(err)
    for(let i = 0;i<data.length;i++){
      seatsArray.push(data[i].seatId)
    }
    //console.log(seatsArray)
    //res.send("Hello")
    return res.json({seats: seatsArray});
  });
})

//Check for existing reservation / Or cancel it 
app.post('/api/modify',(req,res)=>{ 
  const id = req.body.id;
  let action = req.body.action;
  //cancelling 
  if(action=='cancel'){
    Seat.deleteMany({ticketId:id},(err,data)=>{
      if(err) return console.log(err)
      //if no documents to be removed were found
      if(data.n==0){
        return res.json({'text':`There is no reservation with such ticket ID`,'seat':' '})
      }
      return res.json({'text':`Reservation has been cancelled for ticket ID `,'seat':id})
    })
  }
  //showing
  else if(action=='show'){
    
  
  
    Seat.find({ticketId:id}).sort({seatId:'asc'}).exec((err,data)=>{
      if(err) return console.log(err)
      if(data.length>0){
        for(let m=0; m<data.length;m++){
          array.push(data[m].seatId)
        }
        return res.json({'text':'You have reservation on seats:', 'seat':array})
      }
      else{
        return res.json({'text':`There is no reservation with such ticket ID`,'seat':' '});
      }
    })
  }
})

//Make new reservation
app.post("/api/reserve",(req,res)=>{  
  const seat = req.body.seat;
  const ticket = shortid.generate();
  for(let i=0; i<seat.length;i++){
    let newSeat = new Seat({
       seatId:seat[i],
       isTaken:true,
       ticketId:ticket
    })
    newSeat.save();
  }
  res.json({'text':'You have reserved seat(s):'+seat+'. Your ticket ID is:', 'ticketId':ticket}); 
 })

// Express port-switching logic
let port;
console.log("❇️ NODE_ENV is", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 3000;
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  port = 3001;
  console.log("⚠️ Not seeing your changes as you develop?");
  console.log(
    "⚠️ Do you need to set 'start': 'npm run development' in package.json?"
  );
}

// Start the listener!
const listener = app.listen(port, () => {
  console.log("❇️ Express server is running on port", listener.address().port);
});
