const { required } = require("joi");
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
        type : String,
    
    },
    color : {
        type : String,
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
    images : [{
        type : String,
        required : true
    }],
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
