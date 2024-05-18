const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const bestSellers = new Schema({
    name : String,
    price : Number,
    Size : Number,
    Image : String,
});

module.exports = mongoose.model("Best", bestSellers);