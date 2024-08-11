
if(process.env.NODE_ENV = "production"){
  require('dotenv').config()

}

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const userAuthRoutes = require("./routes/userauth");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();

// Database connection
const dbUrl = process.env.ATLASDB_URL;
async function main() {
  try {
    await mongoose.connect(dbUrl);
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection error:", err);
  }
}
main();
const store = MongoStore.create({
  mongoUrl : dbUrl,
  crypto : {
    secret: process.env.SECRET,
  },
  touchAfter: 24*3600, //changes in session after 24 hrs
});

store.on("error", () => {
  console.log("error found in mongo session store");
})

// Session configuration
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // Session cookie expires in one week
    maxAge: 7 * 24 * 60 * 60 * 1000, // Maximum age of the cookie in milliseconds (one week)
    httpOnly: true, // The cookie is only accessible by the web server
  },
};

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser("codeSecret"));
app.use(express.urlencoded({ extended: true }));

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Flash messages and user info middleware
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user || null;
  next();
});

// Routes
app.use("/", userAuthRoutes);
app.use("/lakshBisenNBLogin", adminRoutes);
app.use("/", userRoutes);

app.listen(3000, () => {
  console.log("App is listening on port 3000");
});
