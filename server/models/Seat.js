const mongoose = require('mongoose')

var Schema = mongoose.Schema

var seatSchema = new Schema({
  //_id: mongoose.Schema.Types.ObjectId,
  seatId:String,
  isTaken:Boolean,
  ticketId:String
})

var Seat = mongoose.model("Seat", seatSchema)

module.exports = Seat;