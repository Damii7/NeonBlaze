const express = require("express");
const router = express.Router();
const Request = require("../models/database.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { orderRequest } = require("../schema.js");
const multer = require("multer");
const { isLoggedIn, saveRedirectUrl } = require("../middleware.js");
const {cloudinary, storage} = require("../cloudConfig.js");

const upload = multer({storage}); // Define upload before using it

// Pricing based on font size
const pricing = {
    small: 400,
    medium: 600,
    large: 900
};

// Home page route
router.get("/", wrapAsync((req, res) => {
    res.render("./userModel/home.ejs");
}));

// Customize page route
router.get("/customize", wrapAsync((req, res) => {
    // Calculate the initial estimated cost for display
    const defaultFontSize = "small"; // Default font size
    const estimatedCost = pricing[defaultFontSize] || 0;

    // Render the customize page with the initial estimated cost
    res.render("./userModel/customize.ejs", { estimatedCost });
}));


router.post("/customize", isLoggedIn, upload.array("images", 2), wrapAsync(async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).send('No files uploaded.');
        }

        // Access image URLs and filenames
        const images = req.files.map(file => ({
            url: file.path, // Ensure this gives the correct URL
            fileName: file.filename
        }));

        console.log("Images: ", images); // Debug to check properties

        const result = orderRequest.validate(req.body);
        const { textInput, fontFamily, fontSize, selectedColor, name, phone1, phone2, address } = req.body;

        // Calculate the number of words in the text input
        const words = textInput.trim().split(/\s+/).length;

        // Calculate the estimated cost based on the number of words and font size
        const estimatedCost = words * (pricing[fontSize] || 0);

        // Create a new request object with the submitted data
        const newRequest = new Request({
            textInput,
            fontStyle: fontFamily,
            fontSize,
            color: selectedColor,
            name,
            phone1,
            phone2,
            address,
            owner: req.user._id,
            images, // Set the images array here
            estimatedCost // Set the calculated estimated cost
        });

        // Save the new request to the database
        await newRequest.save();

        // Send the saved request as a response
        res.send(newRequest);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error submitting order.");
    }
}));


router.get("/ourshop", (req, res) => {
    res.render("./userModel/comingsoon.ejs");
})

router.get("/myorders", async(req, res) => {
   const userOrders = await Request.find({owner : req.user});
   res.render("./userModel/myorders.ejs", {userOrders});
})

// Error handling middleware
router.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send("Error submitting order.");
});

// Route for handling all other requests (404)
router.all("*", (req, res) => {
    new ExpressError(404, "Page not found!!");
    res.render("./userModel/error.ejs");
});

module.exports = router;
