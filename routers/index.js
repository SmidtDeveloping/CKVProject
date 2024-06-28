const router = require("express").Router()


router.get("/", (req, res) => {
res.render("index")
})

router.get("/muziek", (req, res) => {
    res.render("muziek")
})
router.get("/dans", (req, res) => {
    res.render("dans")
})
router.get("/kunst", (req, res) => {
    res.render("kunst")
})

module.exports = router