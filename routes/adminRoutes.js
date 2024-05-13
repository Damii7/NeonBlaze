const express = require("express");
const Request = require("../models/database.js");
const router = express.Router(); // Create a new router instance
const passport = require("passport");

// router.get("/", (req, res) => {
//     res.render("./adminModel/welcome.ejs")
// });
router.get("/", (req, res) => {
    res.render("./adminModel/login.ejs");
});
router.post("/", passport.authenticate('local', {failureRedirect : "/", failureFlash : true}), 
async(req, res) => {
    const orders = await Request.find({})
    res.render("./adminModel/welcome.ejs", { orders });
});
router.get("/:id", async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Request.findById(orderId);
        if (!order) {
            return res.status(404).send("Order not found");
        }
        
        // Update the opened field to true when the order is viewed
        if (!order.opened) {
            order.opened = true;
            await order.save();
        }
        
        res.render("./adminModel/info.ejs", { order });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


// router.get("/signup", (req, res) => {
//     res.render("./adminModel/signup.ejs");
// })
module.exports = router;
