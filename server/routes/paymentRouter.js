const express = require("express");
const shortid = require("shortid");
const checkoutRouter = express.Router();
const stripe = require("stripe")(process.env.SECRET_STRIPE_KEY)



module.exports = checkoutRouter;