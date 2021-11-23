const express = require('express');
const app = express();
const postsRoutes = require('./routes/posts')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://candle:rrjNshtDjPAPBkH1@cluster0.7n4kx.mongodb.net/postDatabase?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection failed!!');
  });

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/listing",postsRoutes)

module.exports = app;
