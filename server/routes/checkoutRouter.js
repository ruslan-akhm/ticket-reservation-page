const express = require("express");
const shortid = require("shortid");
const Seat = require("../models/Seat");
const checkoutRouter = express.Router();
const stripe = require("stripe")(process.env.SECRET_STRIPE_KEY);

//stripe back end
checkoutRouter.post("/", async (req, res) => {
  let isError;
  let message;
  try {
    const { product, id, price, user } = req.body;
    let tickets = [];
    for (let i = 0; i < product.length; i++) {
      tickets.push(product[i].id);
    }
    //create payment instance
    const payment = await stripe.paymentIntents.create({
      amount: price,
      currency: "CAD",
      description: `Purchased ${tickets.length} ticket(s): ${tickets}.`,
      payment_method: id,
      confirm: true
    });

    console.log(payment);
    message = "Payment received. Thank you!";
    isError = false;
    console.log(tickets);
    for (let x = 0; x < tickets.length; x++) {
      Seat.updateOne(
        { seatId: tickets[x] },
        { $set: { isTaken: true } },
        (err, data) => {
          if (err) return console.log(err);
        }
      );
    }

    return res.status(200).json({ error: isError, message });
    //if error
  } catch (error) {
    console.log("Error:", error);
    message = error.raw.message;
    isError = true;
    return res.status(400).json({ error: isError, message });
  }
});

module.exports = checkoutRouter;
