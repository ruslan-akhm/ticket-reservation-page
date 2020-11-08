const express = require("express");
const shortid = require("shortid");
const Seat = require("../models/Seat");
const checkoutRouter = express.Router();
const stripe = require("stripe")(process.env.SECRET_STRIPE_KEY);

checkoutRouter.post("/", async (req, res) => {
  console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { product, id, price, user } = req.body;
    let tickets = [];
    for (let i = 0; i < product.length; i++) {
      tickets.push(product[i].id);
    }

    const customer = await stripe.customers.create({
      email: user.email,
      name: user.name
      //source: token.id
    });

    const idempotencyKey = shortid.generate();
    const charge = await stripe.charges.create(
      {
        amount: price,
        currency: "cad",
        customer: customer.id,
        //customer: customer.id,
        //receipt_email: token.email,
        description: `Purchased ${tickets.length} ticket(s): ${tickets}. Customer: ${customer.id}`
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
    error=false
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
    
    //TO USE UPDATE MANY:
    //have to clean userId on front-end whenever user presses CANCEL or PURCHASE and its success - have to anyway
    
    
      // Seat.updateMany(
      //   { userId: user },
      //   { $set: { isTaken: true } },
      //   (err, data) => {
      //     if (err) return console.log(err);
      //     if (!data) console.log("NO TICKET");
      //   }
      // );
    
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
    error=true;
  }

  res.json({ error: error, status });
});

module.exports = checkoutRouter;
