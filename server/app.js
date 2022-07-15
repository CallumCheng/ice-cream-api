const express = require("express");
const cors = require("cors")

const data = require("./data");

//Create an express app
const app = express();

//Tell the app to listen to JSON bodies on POST requests
app.use(express.json());

//add 'headers' to each response, saying that we're okay with sharing resources with others
app.use(cors());

//Set up routes
app.get("/", (req, res) => {
    res.send("Welcome to the Ice Cream API");
})

app.get("/flavours", (req, res) => {

    let flavours = data;

    if (req.query.vegan == 'true') {
        flavours = flavours.filter( f => f["vegan"]);
    }

    res.json({
        flavours: flavours.map(f => f["flavour"])
    })
})

app.get("/flavours/:id", (req, res) => {
    
    //Extract the parameter from the URL
    const id = req.params.id;

    //Filter the data for the ice cream with that id
    const filteredData = data.filter(f => f["id"] == id);

    if (filteredData.length == 1) {
        res.json({
            flavour: filteredData[0]
        }) 
        //Checks if it can be json, stringifies it, tells the client that its a particular 

    } else {
        res.status(404).json({
            error: "I'm afraid we don't have that ice cream"
    })
    }
})

app.post("/flavours", (req, res) => {

    const newFlavour = req.body;
    newFlavour["id"] = data.length +1;
    data.push(newFlavour);

    res.status(201).json({
        success: true,
        flavaour: newFlavour
    })
})


module.exports = app;
