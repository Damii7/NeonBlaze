const express = require("express");
const router = express.Router();
const Request = require("../models/database.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { orderRequest } = require("../schema.js");
const multer = require("multer");

// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/'); // Specify the directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Specify the file name for uploaded files
    }
});

const upload = multer({ storage: storage }); // Define upload before using it

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

// Form submission route for customization
router.post("/customize", upload.array("images", 2), wrapAsync(async (req, res) => {
    try {
        const result = orderRequest.validate(req.body);
        const { textInput, fontFamily, fontSize, selectedColor, name, phone1, phone2, address } = req.body;

        // Calculate the number of words in the text input
        const words = textInput.trim().split(/\s+/).length;

        // Calculate the estimated cost based on the number of words and font size
        const estimatedCost = words * (pricing[fontSize] || 0);

        // Get the filenames of the uploaded images
        const images = req.files.map(file => file.filename);

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
            images,
            estimatedCost // Set the calculated estimated cost
        });

        // Save the new request to the database
        await newRequest.save();

        // Redirect the user to the customize page with a success message
        req.flash("success", "Success! You will be contacted shortly.");
        res.redirect("/customize");

        console.log(newRequest);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error submitting order."); // Sending error response
    }
}));

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
