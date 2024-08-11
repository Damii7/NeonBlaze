const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const Account = require("../models/accounts");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const Request = require("../models/database");

// Configure Passport for the Account model
passport.use('account-local', new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

router.get("/", wrapAsync((req, res) => {
    res.render("./adminModel/login.ejs");
}));

  
router.post("/", 
passport.authenticate("account-local", {
    failureFlash: true,
    failureRedirect: "/lakshBisenNBLogin" // Redirect back to login on failure
}),
wrapAsync(async (req, res) => {
    res.redirect("/lakshBisenNBLogin/welcome"); // Redirect to admin welcome page on success
}));

router.get("/welcome", wrapAsync(async (req, res) => {
    const orders = await Request.find({}).populate("owner");
    res.render("./adminModel/welcome.ejs", { orders });
}));

router.get("/:id", wrapAsync(async (req, res) => {
    const orderId = req.params.id;
    const order = await Request.findById(orderId);
    if (!order) {
        throw new ExpressError("Order not found", 404);
    }
    order.opened = true;
    await order.save();
    res.render("./adminModel/info.ejs", { order });
}));

module.exports = router;
