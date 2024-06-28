const Router = require("express").Router()


Router.get("/", (req, res) => {
res.render("index")
})

Router.get("/muziek", (req, res) => {
    res.render("muziek")
})
Router.get("/dans", (req, res) => {
    res.render("dans")
})
Router.get("/kunst", (req, res) => {
    res.render("kunst")
})

module.exports = Router