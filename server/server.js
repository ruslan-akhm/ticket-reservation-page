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
  console.log('SHOW OR CANCEL BY ID');
  console.log(req.body)
  const id = req.body.id;
  //console.log(id)
  var array = [];
  // const show = req.body.show;
  // console.log("show is "+show, typeof show)
  // const cancel = req.body.cancel;
  // console.log("cancel is "+cancel, typeof cancel)
  let action = req.body.action;
  //cancelling 
  if(action=='cancel'){
    Seat.remove({ticketId:id},(err,c)=>{
      if(err) return console.log(err)
      console.log(c.n)
      if(c.n==0){//if no documents to be removed were found
        res.send({'text':`There is no reservation with such ticket ID`,'seat':' '})
        return
      }
      console.log("There is such ticket and we..")
      console.log("Cancelling reservation")
      res.send({'text':`Reservation has been cancelled for ticket ID `,'seat':id})
      return;
    })
  }
  //showing
  else if(action=='show'){
    Seat.find({ticketId:id}).sort({seatId:'asc'}).exec((err,s)=>{
      if(err) return console.log(err)
      if(s.length>0){
        for(let m=0; m<s.length;m++){
          array.push(s[m].seatId)
        }
        console.log('we sending this array '+array)
        res.send({'text':'You have reservation on seats:', 'seat':array})
        return
      }
      else{
        console.log("no ticket wi this id")
        res.send({'text':`There is no reservation with such ticket ID`,'seat':' '});
        return
      }
    })
    return
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
