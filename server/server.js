const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const shortid = require('shortid');
const Seat = require("../src/database");
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

//Render seats page according to database
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
//Check for existing reservation / Or cancel it 
app.post('/api/id',(req,res)=>{ 
  console.log('HERE');
  const id = req.body.id;
  var array = [];
  const show = req.body.show;
  const cancel = req.body.cancel;
  if(show==null){
    Seat.remove({ticketId:id},(err,c)=>{
      if(err) return console.log(err)
      console.log(c.n)
      if(c.n==0){//if no documents to be removed were found
        res.send(`There is no reservation with such ticket ID`)
        return
      }
      //Make id enter field required on front-end to prevent receiveng empty req
      /*else if(c.length==0){
        res.send(`Please enter ID`)
        return
      }*/ 
      console.log("Cancelling reservation")
      res.send(`Reservation under ticket ID `+id+` has been cancelled`)
      return;
    })
  }
  else if(cancel==null){
    console.log("Checking reservation")
    Seat.find({ticketId:id}).sort({seatId:'asc'}).exec((err,s)=>{
      if(err) return console.log(err)
      if(s.length>0){
        for(let m=0; m<s.length;m++){
          array.push(s[m].seatId)
        }
        res.send(`You have reserved seat(s) `+array);
        return
      }
      else{
        res.send(`There is no reservation under this ID`);
        return
      }
    })
    return
  }
})

//Make new reservation
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
    var newSeat = new Seat({
       seatId:checked[i],
       isTaken:true,
       ticketId:ticket
    })
    newSeat.save();
  }
  //res.redirect("/return.html")  // to open new page and reflect 
    res.status(201).send({'seatsId':checked, 'ticketId':ticket})
  //res.send(`You have reserved seats `+checked +`, Your ticket id is `+ticket)
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
