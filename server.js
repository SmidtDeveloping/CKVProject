
//Imports
require("dotenv").config()
const express = require("express");
const bodyParser = require('body-parser');
const path = require("path")
const app = express()
const nodemailer = require("nodemailer")

// Router imports 

const router_index = require("./routers/index")



// Bodyparses

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// EJS 

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs")
app.set('trust proxy', true);

//Static

app.use('/static', express.static(path.join(__dirname, 'public')))

// Routers
let transporter = nodemailer.createTransport({
    host: "smtp.hostnet.nl",
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMPT_email,
        pass: process.env.SMPT_Password,
    },
})
const geoip = require("geoip-lite")
app.post("/me/sendMail", (req, res) => {
    const ip = req.ip
        console.log(ip);
    const geo = geoip.lookup(ip);
    const location = geo ? `${geo.city}, ${geo.region}, ${geo.country}` : 'Unknown location';
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().replace('T', ' ').replace(/\..+/, '');
    let mailOptions = {
        from: "noreply@developingbyjulian.nl",
        to: "juliansmidt@esdalcollege.eu",
        subject: "page Load | CKV Project",
        text: `
        Message: ${req.query.message || "Geen Message"}
        Datum: ${formattedDate} 
        IP: ${ip}
        Location: ${location}
        
        `
        
        
        ,
        headers: {
            'Reply-To': "contact@developingbyjulian.nl"
        }
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return  console.log(error);
           
        }
        return console.log(info);
        
    })
})
app.use(router_index)

//Export
let port = 3000
app.listen(port, () => {
    console.log(`✅| Server ${port}`)
})