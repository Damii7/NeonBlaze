const mongoose = require('mongoose');
const { Schema } = mongoose; // Import Schema from mongoose
const passportLocalMongoose = require('passport-local-mongoose');
const Request = require("./database");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  orders: [{  // Change 'order' to 'orders' and make it an array
    type: Schema.Types.ObjectId,
    ref: "Request",
  }]
});


userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;
