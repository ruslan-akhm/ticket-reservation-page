const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const shortid = require('shortid');
const apiRouter = require('./routes/apiRouter');
var database = process.env.SECRET;//"mongodb+srv://ruslan-akhm:zuaGc0VJ@cluster0-y5h11.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(database,{useNewUrlParser: true, useUnifiedTopology: true},()=>{
    console.log('database connected')
})
const sassMiddleware = require("node-sass-middleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"));
app.use(express.static('/tmp'));
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/index.html");
});

app.use(sassMiddleware({
  src: __dirname + '/public',
  dest: '/tmp',
  //debug: true,
  //outputStyle: 'compressed',
}));

app.use('/api',apiRouter);

// Express port-switching logic as this app was written in Glitch
let port;
console.log("NODE_ENV is", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 3000;
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  port = 3001;
  console.log("Not seeing your changes as you develop?");
  console.log(
    "Do you need to set 'start': 'npm run development' in package.json?"
  );
}

// Start the listener!
const listener = app.listen(port, () => {
  console.log("Express server is running on port", listener.address().port);
});
