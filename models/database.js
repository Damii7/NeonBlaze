const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const orderSchema = new Schema({
    textInput : {
        type: String,

    },
    fontStyle : {
        type : String,
        
    },
    fontSize : {
        type : Number,
    
    },
    name: {
        type: String,
        required: true,
    },
    phone1: {
        type: Number,
        required: true,
    },
    phone2: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    estimatedCost : {
        type : Number,
        required : true
    },
    opened: {
        type: Boolean,
        default: false // Set default value to false
    }
});

// Define the Order model using the orderSchema
const Request = mongoose.model("Request", orderSchema);

module.exports = Request;
//for orderform.ejs


// const typedText = document.querySelector("#typedText");
// const selectedText = document.querySelector("#selected");
// const selectedSize = document.querySelector("#selectedSize");

// typedText.value = textInput.value;
// selectedSize.value = fontFamilySelect.value;
// selectedSize.value = fontSizeInput.value;
