const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Account = require("../models/accounts.js");
const Request = require("../models/database.js")


passport.use(new LocalStrategy(Account.authenticate()));

// Serialize user into the session
passport.serializeUser(Account.serializeUser());

// Deserialize user from the session
passport.deserializeUser(Account.deserializeUser());

  
  
  
router.get("/", wrapAsync((req, res) => {
    res.render("./adminModel/login.ejs");
}));

router.post("/", 
passport.authenticate("local",
 {failureRedirect : "/",
  failureFlash : true }),
wrapAsync(async (req, res) => {
 req.flash("success", "You're in admin mode now");
 const orders = await Request.find({});
 res.render("./adminModel/welcome.ejs", {orders});
}));
router.get("/:id", wrapAsync(async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Request.findById(orderId);
        if (!order) {
            throw new Error("Order not found");
        }
        
        // Mark the order as opened (read)
        order.opened = true;
        await order.save();
        
        res.render("./adminModel/info.ejs", { order });
    } catch (error) {
        console.error(error);
        res.status(404).send("Order not found");
    }
}));
module.exports = router;