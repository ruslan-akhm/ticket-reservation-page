# Ticket Reservation App
---
### About 
This app allows users to make reservations for a movie by choosing seats, modifying/confirming corresponding tickets in cart and purchasing them via secure payment page.

The app was originally built and is available Live [on Glitch](https://ticket-reservation-page.glitch.me/)

---
### Preview 

![Mainpage](https://cdn.glitch.com/3eeb3b2b-1bb2-49a0-811f-d94dbc022a91%2FTicketsPage.jpg?v=1612730796195)

---
### Tech Stack
  - React.js
  - SaSS
  - Node/Express
  - MongoDB
  - Stripe.js

---

### Run locally
```sh
$ git clone https://github.com/ruslan-akhm/ticket-reservation-page.git
$ cd ticket-reservation-page
$ npm install
$ npm start
```
Server will set up on port 3001 and app will start om port 3000
Make sure to provide .env in **root folder** file with following variables:
 - SECRET (MongoDB database in format mongodb+srv://<username>:<password>@cluster...)
 - STRIPE_KEY (stripe **public** key)
 - SECRET_STRIPE_KEY (stripe **secret** key)

---
### Author
Ruslan Akhmetshin
