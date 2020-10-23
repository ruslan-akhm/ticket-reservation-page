const express = require("express");
const shortid = require("shortid");
const Seat = require("../models/Seat");
const apiRouter = express.Router();

//Render seats page according to database
apiRouter.get("/", (req, res) => {
  var seatsArray = [];
  Seat.find({ isSecured: true }, (err, data) => {
    //isSecured true!!!!!!!!!!!!!!!!!!!!!!!!!!
    if (err) return console.log(err);
    for (let i = 0; i < data.length; i++) {
      seatsArray.push(data[i].seatId);
    }
    return res.json({ seats: seatsArray });
  });
});

//Check for existing reservation / Or cancel it
apiRouter.post("/modify", (req, res) => {
  const id = req.body.id;
  let action = req.body.action;
  //cancelling
  if (action == "cancel") {
    Seat.deleteMany({ ticketId: id }, (err, data) => {
      if (err) return console.log(err);
      //if no documents to be removed were found
      if (data.n == 0) {
        return res.json({
          text: `There is no reservation with such ticket ID`,
          seat: " "
        });
      }
      return res.json({
        text: `Reservation has been cancelled for ticket ID `,
        seat: id
      });
    });
  }
  //showing
  else if (action == "show") {
    let array = [];
    Seat.find({ ticketId: id })
      .sort({ seatId: "asc" })
      .exec((err, data) => {
        if (err) return console.log(err);
        if (data.length > 0) {
          for (let m = 0; m < data.length; m++) {
            array.push(data[m].seatId);
          }
          return res.json({
            text: "You have reservation on seats:",
            seat: array
          });
        } else {
          return res.json({
            text: `There is no reservation with such ticket ID`,
            seat: " "
          });
        }
      });
  }
});

//Make new reservation
apiRouter.post("/reserve", (req, res) => {
  const seat = req.body.seat;
  const ticket = shortid.generate();
  for (let i = 0; i < seat.length; i++) {
    let newSeat = new Seat({
      seatId: seat[i],
      isTaken: true,
      ticketId: ticket
    });
    newSeat.save();
  }
  res.json({
    text: "You have reserved seat(s):" + seat + ". Your ticket ID is:",
    ticketId: ticket
  });
});

apiRouter.post("/secure", (req, res) => {
  const seats = req.body.seats;
  const ticket = shortid.generate();
  //check if any of the chosen seats were secured in the meanwhile;
  // for (let i = 0; i < seats.length; i++) {
  //   Seat.find({ seatId: seats[i].seat }, (err, seat) => {
  //     if (err) return console.log(err);
  //     if (seat) {
  //       console.log("taken already")
  //       return res.json({
  //         message:
  //           "We are sorry. Seats you've chosen are already taken. Please choose another seats",
  //         error: true
  //       });
  //     }
  //     
  //   });
  // }
  for (let j = 0; j < seats.length; j++) {
    let newSeat = new Seat({
      seatId: seats[j].seat,
      ticketId: ticket,
      isSecured: true,
      isTaken: false,
      price: seats[j].price
    });
    newSeat.save();
  }
  res.json({
    text: `You have secured ${seats.length} seat(s). Your reservation Id: ${ticket}`,
    secured: true,
    ticketId: ticket
  });
});

apiRouter.post("/unsecure", (req, res) => {
  console.log(req.body);
  const seat = req.body.ticket;
  console.log(seat, typeof seat);
  Seat.deleteOne({ seatId: seat }, (err, item) => {
    if (err) return console.log(err);
    if (!item) res.json({ message: "Secure was not found", error: true });
    //if "remove" btn clicked after timer ran off
    else {
      res.json({ message: "Seat was removed", error: false });
    }
  });
});

module.exports = apiRouter;
