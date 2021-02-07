const express = require("express");
const shortid = require("shortid");
const Seat = require("../models/Seat");
const apiRouter = express.Router();

//Render seats page according to database
apiRouter.get("/", (req, res) => {
  //delete seats that were secured, but were not purchased or user closed the page before 5 min passed
  Seat.deleteMany(
    {
      isSecured: true,
      isTaken: false,
      dateSecured: { $lte: Date.now() - 360000 },
    },
    (err, data) => {
      if (err) return console.log(err);
      var seatsArray = [];
      Seat.find({ isSecured: true }, (err, data) => {
        if (err) return console.log(err);
        for (let i = 0; i < data.length; i++) {
          seatsArray.push(data[i].seatId);
        }
        return res.json({ seats: seatsArray, userId: shortid.generate() });
      });
    }
  );
});

apiRouter.post("/secure", (req, res) => {
  const seats = req.body.seats;
  const userId = req.body.userId;

  //check if any of the chosen seats were secured in the meanwhile;

  //   for (let i = 0; i < seats.length; i++) {
  //     Seat.find({ seatId: seats[i].id }, (err, seat) => {
  //       if (err) return console.log(err);
  //       if (seat) {
  //         console.log("taken already")
  //         return res.json({
  //           message:
  //             "We are sorry. Seats you've chosen are already taken. Please choose another seats",
  //           error: true
  //         });
  //       }

  //     });
  //   }

  //delete all previously secured tickets for the user, if any (if they navigate back in browser and secure some other seats)
  Seat.deleteMany({ userId: userId }, (err, item) => {
    if (err) return console.log(err);
  });

  //save new seats for user
  for (let j = 0; j < seats.length; j++) {
    let newSeat = new Seat({
      seatId: seats[j].id,
      userId: userId,
      isSecured: true,
      isTaken: false,
      price: seats[j].price,
      dateSecured: Date.now(),
    });
    newSeat.save();
  }
  res.json({
    text: `You have secured ${seats.length} seat(s). Your reservation Id: ${userId}`,
    secured: true,
    userId: userId,
  });
});

//unsecure tickets (when "cancel" is clicked on front end)
apiRouter.post("/unsecure", (req, res) => {
  console.log("UNSECURE");
  console.log(req.body);
  const seat = req.body.ticket;
  const userId = req.body.userId;

  //unsecure by seat and not by userId for the purpose of deleting particular tickets and not necesseraly all user's reservations
  for (let i = 0; i < seat.length; i++) {
    Seat.deleteOne({ seatId: seat[i] }, (err, item) => {
      if (err) return console.log(err);
      if (!item) res.json({ message: "Secure was not found", error: true });
    });
  }
  res.json({ message: "Seats were removed", error: false });
});

module.exports = apiRouter;
