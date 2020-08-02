const mongoose = require('mongoose')

var Schema = mongoose.Schema

var seatSchema = new Schema({
  seatId:String,
  isTaken:Boolean,
  ticketId:String
})

var Seat = mongoose.model("Seat", seatSchema)

module.exports = Seat;