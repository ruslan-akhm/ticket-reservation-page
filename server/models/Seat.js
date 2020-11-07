const mongoose = require('mongoose')

var Schema = mongoose.Schema

var seatSchema = new Schema({
  seatId:String,
  isTaken:Boolean,
  isSecured:Boolean,
  userId:String,
  price:String,
  dateSecured:Number
})

var Seat = mongoose.model("Seat", seatSchema)

module.exports = Seat;