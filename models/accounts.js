const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const accSchema = new Schema({
  email :{
    type : String,
    required : true
  }
});
accSchema.plugin(passportLocalMongoose);

module.exports =  mongoose.model("Account", accSchema);