const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const Request = require("./models/database.js");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const Account = require("./models/accounts.js");
const axios = require('axios');
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
const { urlencoded } = require("body-parser");
app.use(cookieParser("codeSecret"));

const sessionOptions = {
  secret : "incaseYOuhaveNT",
  saveUninitialized : true,
  resave : false,
  cookie : {
    expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge : 7 * 24 * 60 * 60 * 1000,
    httpOnly : true,
  }
}
app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next)=> {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user; // Corrected to req.user for authenticated user
  next();
});
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
async function main() {
  try{
    await mongoose.connect('mongodb://127.0.0.1:27017/order');
    console.log("Database connected sucessfully");
  }catch(err){
    console.log("Database could not be connected : ", err);
  }
 
}
main();


const userAcc = require("./routes/userauth.js")
const userRoutes = require("./routes/userRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");
// const pay = require("./phonePe.js");
app.use(express.urlencoded({ extended: true }));


// app.use ("/pay", pay);
app.use("/", userAcc)
app.use("/", userRoutes);



app.listen(3000, () => {
    console.log("app is listening on port 3000");
});
