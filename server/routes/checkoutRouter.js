const express = require("express");
const shortid = require("shortid");
const Seat = require("../models/Seat");
const checkoutRouter = express.Router();
const stripe = require("stripe")(process.env.SECRET_STRIPE_KEY);

checkoutRouter.post("/", async (req, res) => {
  //console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { product, token, price, user } = req.body;
    let tickets = [];
    for (let i = 0; i < product.length; i++) {
      tickets.push(product[i].id);
    }

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const idempotencyKey = shortid.generate();
    const charge = await stripe.charges.create(
      {
        amount: price * 100,
        currency: "cad",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased ${tickets.length} ticket(s): ${tickets}. User: ${user}`
        // shipping: {
        //   name: token.card.name,
        //   address: {
        //     line1: token.card.address_line1,
        //     line2: token.card.address_line2,
        //     city: token.card.address_city,
        //     country: token.card.address_country,
        //     postal_code: token.card.address_zip
        //   }
        // }
      },
      {
        idempotencyKey
      }
    );
    //console.log("Charge:", { charge });
    console.log("Charge:");
    status = "success";
    console.log(tickets);
    for (let x = 0; x < tickets.length; x++) {
      console.log(tickets[x], typeof tickets[x]);
      Seat.update({ seatId: tickets[x], $set: isTaken:true }, (err, data) => {
        if (err) return console.log(err);
        if (!data) console.log("NO TICKET");
        //return res.json({message:"No tickets found", error:true})
        else {
          console.log(data);
         // data[0].isTaken = true;
        }
      });
    }
  } catch (error) {
    //console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
});

module.exports = checkoutRouter;
