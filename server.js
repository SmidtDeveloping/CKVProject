
//Imports

require("dotenv").config()
const express = require("express");
const bodyParser = require('body-parser');
const path = require("path")
const app = express()
const mongoose = require("mongoose")
// Router imports 

const router_index = require("./routers/index")


// DB

mongoose.connect(process.env.MONGODB)
.then(
    console.log("✅| Database")
)

// Bodyparses

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// EJS 

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs")

//Static

app.use('/static', express.static(path.join(__dirname, 'public')))

// Routers


app.use(router_index)

//Export
let port = 3000
app.listen(port, () => {
    console.log(`✅| Server ${port}`)
})