const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/userAcc');
const { isLoggedIn, saveRedirectUrl } = require('../middleware');

// Configure Passport for the User model
passport.use('user-local', new LocalStrategy(User.authenticate()));

// Serialize user into the session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Registration route
router.get("/signup", (req, res) => {
  res.render("./userModel/signup.ejs");
});

router.post("/signup", async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log("User registered: ", registeredUser);

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Your account was created");
      res.redirect("/");
    });
  } catch (err) {
    console.log("Error during registration:", err);
    req.flash("error", err.message);
    res.redirect("/signup");
  }
});

// Login route
router.get("/login", (req, res) => {
  res.render("./userModel/login.ejs");
});

router.post('/login', saveRedirectUrl, passport.authenticate('user-local', {
  failureRedirect: '/login',
  failureFlash: true
}), (req, res) => {
  console.log("Logged in user: ", req.user);
  res.redirect(req.session.returnTo || "/");
  delete req.session.returnTo;
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


module.exports = router;
