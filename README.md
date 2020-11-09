1.After user chooses tickets and clicks "Next", tickets are getting secured, so other users won't be able to choose them
(an API call made to back-end to update database documents)
2.User is given time to finish their purchase (5 min), if failed to do so, tickets get unsecured when timer reaches 00:00 and user would have to start over.
(all the states, as well as window interval are cleared; API call unsecures tickets on back-end)
3.If page refreshed at any point of time, all the necessary information is saved (like timer and secured tickets)
(necessary information is stored in sessionStorage as well; it is being updated accordingly)
4.If user leaves the page without purchasing the order their tickets will get unsecured after 5 minutes anyway
(whenever some other user visits the page, the back-end checks for any secured tickets with expired time and updates the database correspondingly)
5.User is directed to secure payment form to make their purchase.
(secure payment is built with Stripe.js)