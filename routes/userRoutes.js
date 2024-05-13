const express = require("express");
const router = express.Router();
const Request = require("../models/database.js");
const Account = require("../models/accounts.js")
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { orderRequest } = require("../schema.js");
const multer = require("multer");
const { signedCookie } = require("cookie-parser");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, 'upload/') // Specify the directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname) // Specify the file name for uploaded files
    }
});

const upload = multer({ storage: storage });

router.get("/", wrapAsync((req, res) => {
    res.render("./userModel/home.ejs");
}));

router.get("/customize", wrapAsync((req, res) => {
    res.render("./userModel/customize.ejs");
}));

router.post("/customize",  upload.single("images"), wrapAsync(async (req, res) => {
    const result = orderRequest.validate(req.body);
    try {
        const { textInput, fontFamily, fontSize, name, phone1, phone2, address, image, estimatedCost } = req.body;
        const newRequest = new Request({
            textInput: textInput,
            fontStyle: fontFamily,
            fontSize: fontSize,
            name: name,
            phone1: phone1,
            phone2: phone2,
            address: address,
            image: image,
            estimatedCost: estimatedCost,
        });
        await newRequest.save();
        req.flash("success", "Success! Your order was placed");
        res.redirect("/customize");
        console.log(newRequest);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error submitting order."); // Sending error response
    }
}));

router.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send("Error submitting order.");
});

router.all("*", (req, res) => {
    new ExpressError(404, "Page not found!!");
    res.render("./userModel/error.ejs");
});

module.exports = router;
