const express = require("express");
const router = express.Router();
const User = require("../models/userAcc.js");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, saveRedirectUrl } = require("../middleware.js");
const passportLocalMongoose = require('passport-local-mongoose');

// Configure Passport to use local strategy with Passport-Local-Mongoose
passport.use(new LocalStrategy(User.authenticate()));

// Serialize user into the session
passport.serializeUser(User.serializeUser());

// Deserialize user from the session
passport.deserializeUser(User.deserializeUser());

// Signup routes
router.get("/signup", (req, res) => {
  res.render("./userModel/signup.ejs");
});

router.post("/signup", wrapAsync(async (req, res, next) => {
  try {
    const { username, phone, password } = req.body;
    const newUser = new User({ username, phone });
    let registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to HomeMed");
      res.redirect("/");
    });
  } catch (e) {
    console.log(e);
    req.flash("error", e.message);
    res.redirect("/signup");
  }
}));

// Login routes
router.get("/login", (req, res) => {
  res.render("./userModel/login.ejs");
});

router.post("/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
  }), saveRedirectUrl,
  async (req, res) => {
    req.flash("success", "Welcome to HomeMed, You are logged-in now");
    let redirectUrl = res.locals.redirectUrl || "/";
    res.redirect(redirectUrl);
  });

// Logout route
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out now");
    res.redirect("/");
  });
});

// Export the router
module.exports = router;
