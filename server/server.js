const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const shortid = require('shortid');
const Seat = require("../src/database");
var dataMongo = "mongodb+srv://ruslan-akhm:zuaGc0VJ@cluster0-y5h11.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(dataMongo, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
var db = mongoose.connection;

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"));
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/index.html");
});

// PWAs want HTTPS!
/* function checkHttps(request, response, next) {
  // Check the protocol — if http, redirect to https.
  if (request.get("X-Forwarded-Proto").indexOf("https") != -1) {
    return next();
  } else {
    response.redirect("https://" + request.hostname + request.url);
  }
}
app.all("*", checkHttps);   */

app.post('/api/id',(req,res)=>{
  console.log('HERE')
  const id = req.body.id;
  Seat.find({ticketId:id},(err,s)=>{
    if(err) return console.log(err)
    console.log(s);
  })
  res.send("OKK")
})

app.get('/api',(req,res)=>{
  console.log("RECEIVED REQ");
  var seatsArray = []
  Seat.find({isTaken:true},(err,data)=>{
    if(err) return console.log(err)
    for(let i = 0;i<data.length;i++){
      seatsArray.push(data[i].seatId)
    }
    res.send(seatsArray);
  });
})

app.post("/api/reserve",(req,res)=>{  
  const array = []; 
  const seat = req.body.seat
  console.log("POSTING TICKETS")
  if(seat==null){
    res.send("Please, choose seats to reserve") 
    return
  }
  const checked = array.concat(seat)
  var ticket = shortid.generate();
  console.log(checked, typeof checked)
  for(let i=0; i<checked.length;i++){
   //Seat.find({seatId:checked[i]},(err,data)=>{
   //  if(err)  return console.log(err)
   //   if(data==null){
   //     console.log("CREATE NEW TICKET")
        //IF THIS SEAT WASN'T TAKEN
        var newSeat = new Seat({
          seatId:checked[i],
          isTaken:true,
          ticketId:ticket
        })
        newSeat.save();
  }
  
  
  //res.redirect('/return.html')
  res.send(`You have reserved seats `+checked +`, Your ticket id is `+ticket)
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
