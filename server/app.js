const express = require("express");

//Create an express app
const app = express();

//Set up route
app.get("/", (req, res) => {
    res.send("Welcome to the Ice Cream API");
})

module.exports = app;
